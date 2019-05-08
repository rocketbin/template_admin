const hexa = /#[0-9A-F]{6}/gmi
const rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
const texts = /^.*cjs.Text.+/gmi
const quoted = /(["'])(?:(?=(\\?))\2.)*?\1/mi
const images = /(.*src.*)/m
const parentPar = /[^\(]*(\(.*\))[^\)]*/mi
const parenthesis = /\(([^)]+)\)/mi
const camma = /([^,]+)/
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
    return {
      colors,
      texts,
      images
    }
  },
  /*
   * color search
  */
  map_hex_colors (str) {
    if(hexa.test(str)) {
      let matches = str.match(hexa);
      if(matches) {
        let _m = matches.filter((v,i) => matches.indexOf(v) === i)
        return {
          success: true,
          data: _m.map(m => {
            return {
              original: m,
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
      _raw: objc === null ? '': this.removeDoubleQuotes(objc[0]),
      text: objc === null ? '': this.removeDoubleQuotes(objc[0]),
      model: objc === null ? '': this.removeDoubleQuotes(objc[0]),
      color: objc === null ? '': this.removeDoubleQuotes(comSprtr[comSprtr.length-1]),
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

  /*
   * images search
  */
  map_images (str) {
    let matches = str.match(images);
    if(matches) {
      let _m = matches.filter((v,i) => matches.indexOf(v) === i)
      return _m.map(m => this.objectizeImg(m))
    }
    else {
      return []
    }
  },

  /*
   * images search
  */
  objectizeImg (str) {
    let objc = str.match(quoted)
    return {
      path: this.removeDoubleQuotes(objc[0]),
      id: this.removeDoubleQuotes(objc[1])
    }
  },
  /*
   * 
  */
  RippedText (str, obj) {
    let textObjs = {};
    obj.texts.map(text => {
      Object.assign(textObjs, {[text.text]: text.model})
    })
    obj.colors.data.map(color => {
      Object.assign(textObjs, {[color.original]: `json[lib.group_uuid].colorpalette[${color.type}]`})
    })
    return this.replaceAll(str, textObjs);
  },
   replaceAll(str,mapObj) {
    var re = new RegExp(Object.keys(mapObj).join("|"),"gmi");
    return str.replace(re, function(matched){
        return mapObj[matched];
    });
  }
}
