const hexa = /#[0-9A-F]{6}/gi
const rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
const texts = /^.*cjs.Text.+/gmi
const quoted = /(["'])(?:(?=(\\?))\2.)*?\1/gmi
const images = /(.*src.*)/gm
export default {

  getProperties (str) {
    let colors = this.map_hex_colors(str);
    let texts = this.conv_strs(this.map_str(str));
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
    let matches = str.match(hexa);
    if(matches) {
      let _m = matches.filter((v,i) => matches.indexOf(v) === i)
      return _m.map(m => this.hexToRgbA(m))
    } else {
      return []
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
    let matches = str.match(texts);
    if(matches) {
      return matches.filter((v,i) => matches.indexOf(v) === i)
    } else {
      return []
    }
  },

  /*
   * remove double quotes from a string 
  */
  removeDoubleQuotes (str) {
    if(str)
      return str.replace(/^"(.+)"$/, '$1');
    else
      return str
  },

  conv_strs (matches) {
    return matches.map((match) => {
      return this.objectizeStr(match)
    })
  },
  objectizeStr (str) {
    let objc = str.match(quoted)
    return {
      text: this.removeDoubleQuotes(objc[0]),
      style: objc[1],
      color: this.removeDoubleQuotes(objc[2]),
    }
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



}
