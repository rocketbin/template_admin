const hexa = /#[0-9A-F]{6}/gmi
const rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
const texts = /^.*cjs.Text.+/gmi
const quoted = /(["'])(?:(?=(\\?))\2.)*?\1/mi
const images = /(.*src.*)/m
const parentPar = /[^\(]*(\(.*\))[^\)]*/mi
const parenthesis = /\(([^)]+)\)/mi
const camma = /([^,]+)/
const comments = /\/{2}.*?$/gmi
const tintedColor = /(getTintedColor?)([^\s]+)/gm
const paramImages = /\(lib.(.*) [\s\S]*?(Bitmap)\(\)\;[\s\S]*?(Rectangle)\(0,0,(\d*),(\d*)\)/gm
const headerText = /\(function \(([\s\S]*?)\/\/ symbols:$/gm
const headerSize = /Rectangle\(0,0,(\d*),(\d*).*\)/
const headerTitle = /photo(.\S*)/
const footerText = /\lib.properties ([\s\S]*?)AdobeAn;$/gm
const sceneTitle = /\/\/ stage content:[.\s]*\(lib.(.*) =/gm
const matrix = /\(img\.(.*), null, (.*)\)\.s/gm
const mtr = /Matrix2D([\s\S]*?)\)/gm
const mtrxName = /img\.([\S]*?)\,/gm
export default {
  /*
   * return as error
  */
  returnFalseState() {
    return {
      success: false,
      data: []
    }
  },

  getProperties (str) {
    let colors = this.map_hex_colors(str);
    let texts = this.conv_strs(this.map_str(str)['data']);
    let images = this.map_images(str);
    let matrix = [];
    return {
      colors,
      texts,
      images,
      matrix
    }
  },
  map_matrix(str) {
    if(matrix.test(str)) {
      let matches = str.match(matrix)
      return matches.map(mtc => {
        return this.objectifyMtr(mtc)
      })
    } else {
      return this.returnFalseState()
    }
  },

  objectifyMtr (mtc) {
    if(mtr.test(mtc)) {
      let tr = mtc.match(mtr)
      let trName = mtc.match(mtrxName)
      return { 
        param: tr[0], 
        name: trName[0],
        origin: mtc,
        _origin: mtc,
      }
    }
  },

  /*
   * images search
  */
  map_images (str) {
    if(paramImages.test(str)) {
      let res = [];
      let matches = str.match(paramImages);
      let matrix  = this.map_matrix(str)
      return matches.map((mt) => {
        return this.objectifyImg(mt, matrix);
      })
    } else {
      return []
    }
  },

  /*
   * images search
  */
  objectifyImg (img, matrix) {
    let title = img.match(/lib(.\S*)/)
    let size = img.match(headerSize)
    let _title = title[1].substring(1)
    let mt = matrix.filter((v, i) => {
      if(v.name.indexOf(_title) > 0) {
        return v
      }
    })
    // console.log(_title,mt);
    return {
      // path: this.removeDoubleQuotes(objc[0]),
      matrix: mt[0] ,
      id: _title,
      sizeOrigin:size[0],
      _sizeOrigin:size[0],
      width: size[1],
      _width: size[1],
      height: size[2],
      _height: size[2],
      distort:false,
      fill:false,
    }
  },
  /*
   * color search
  */
  map_hex_colors (str) {
    if(hexa.test(str)) {
      let matches = str.match(hexa);
      if(tintedColor.test(str)) {
        let tints = str.match(tintedColor)
        tints.map(tnt => {
          matches.push(tnt)
        })
      }
      if(matches) {
        let _m = matches.filter((v,i) => matches.indexOf(v) === i)
        return {
          success: true,
          data: _m.map((m, ind) => {
            return {
              ind: ind,
              original: '"' + m + '"',
              color: this.hexToRgbA(m),
              type: 0,
              shade: 20,
              tint: 0,
            }
          })
        }
      }
    } else {
      return this.returnFalseState()
    }

  },

  /*
   * color construct
  */
  constructRgba (color) {
    return `rgba( ${color.r},${color.g},${color.b},${color.a} )`;
  },

  hexToRgbA(hex){
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
      }
      throw new Error('Bad Hex');
  },

  /*
   * text str search
  */
  map_str (str) {
    if(texts.test(str)) {
      let matches = str.match(texts);
      if(matches) {
        return {
          success: true,
          data: matches.filter((v,i) => matches.indexOf(v) === i)
        }
      }
    } else {
      return this.returnFalseState()
    }
  },

  /*
   * remove double quotes from a string 
  */
  removeDoubleQuotes (str) {
    let dq = str.includes(`"`)
    if(dq > 0)
      return str.replace(/"/g, '');
      // return str.replace(/^"(.+)"$/, '$1');
    else
      return str
  },

  conv_strs (matches) {
    return matches.map((match) => {
      return this.objectizeStr(match)
    })
  },
  objectizeStr_getInsideStrings (str) {
    if(parentPar.test(str)) {
      let pair = str.match(parentPar)
      return {
        success: true,
        data: pair[1]
      }
    } else {
      return this.returnFalseState()
    }
  },
  objectizeStr_separateCamma(str) {
    if(parenthesis.test(str)) {
      let pair = str.match(parenthesis)
      return {
        success: true,
        data: pair[1]
      }
    } else {
      return this.returnFalseState()
    }

  },
  objectizeStr (str) {
    let _is   = this.objectizeStr_getInsideStrings(str);
    let pairs = this.objectizeStr_separateCamma(_is.data)
    let objc  = pairs.data.match(quoted)
    let comSprtr = pairs.data.split(',');
    return {
      origin: str.trim().slice(),
      new: str.trim(),
      _raw: objc === null ? '': objc[0],
      text: objc === null ? '': objc[0],
      model: objc === null ? '': objc[0],
      color: objc === null ? '': comSprtr[comSprtr.length-1],
    }
  },
  reconstructText (str, obj) {
    var newStr;
    obj.texts.map(text => {
        let nt = text.new.replace(text.text, text.model)
        newStr = str.replace(text.origin, nt)
        text.origin = text.new
        text.text = text.model
    });
    return newStr;
  },

  /* removes the function wrapping of a scene*/
  removeFunctionWrapping (str) {
    if(headerText.test(str)) {
      let newStr = str.replace(headerText, '')
      return newStr.replace(footerText, '')
      // return this.removeComments(rep.replace('var createjs, AdobeAn;', ''));
    } else {
      return this.removeComments(str);
    }
  },
  /* removes the comments*/
  removeComments (str) {
    let m;
    let mapObj = {};
    if ( comments.test(str) ) {
      str.match(comments).map(match => { 
        Object.assign(mapObj, {[match]: "_" })
      })
      return this.replaceAll(str, mapObj)
    } else {
      return str
    }

  },
  /*
   * 
  */
  escapeStrRegExp (text) {
    text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return(text)
  },

  RippedText (str, obj) {
    let textObjs = {}
    let escStr = this.escapeStrRegExp
    obj.texts.map(text => {
      let _t = escStr(text.text);
      Object.assign(textObjs, {[_t]: text.model}) 
    })
    obj.colors.data.map((color, index) => {
      Object.assign(textObjs, {[escStr(color.original)]: ` getTintedColor(lib.properties.color(json[lib.group_uuid].colorpalette[0], ${color.type}), ${color.tint}) `})
      color.original = ` getTintedColor(lib.properties.color(json[lib.group_uuid].colorpalette[0], ${color.type}), ${color.tint}) `
    })
    obj.images.map((img, ind) => {
      console.log(img.matrix.origin)
      Object.assign(textObjs, {[escStr(img.sizeOrigin)]: `Rectangle(0,0,img.${img.id}.naturalWidth,img.${img.id}.naturalHeight)`})
      img.sizeOrigin = `Rectangle\(0,0,img.${img.id}.naturalWidth,img.${img.id}.naturalHeight\)`
      Object.assign(textObjs, {[escStr(img.matrix.origin)]: `(img.${img.id},null,lib.properties.scalableBitmapFill(img.${img.id}, {width: ${img._width}, height: ${img._height}}, 0, 0, ${img.distort}, ${img.fill})).s`})
      img.matrix.origin =`(img.${img.id},null,lib.properties.scalableBitmapFill(img.${img.id}, {width: ${img._width}, height: ${img._height}}, 0, 0, ${img.distort}, ${img.fill})).s`
    });
    console.log(textObjs)
    return this.replaceAll(str, textObjs)
  },
   replaceAll(str,mapObj) {
    let escStr = this.escapeStrRegExp
    let escDQ = this.removeDoubleQuotes
    var re = new RegExp(Object.keys(mapObj).join("|"),"gmi");
    return str.replace(re, function(matched){
      if(/[-[\]{}()*+?.,\\^$|#\s]/g.test(matched)) {
        matched = escStr(matched)
      }
      if(mapObj[matched] === undefined) {
        return " "
      }
      return mapObj[matched];
    });
  }
}

