function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/***********************************************
  ____  _   _ ___ _     ____  _____ ____
 | __ )| | | |_ _| |   |  _ \| ____|  _ \
 |  _ \| | | || || |   | | | |  _| | |_) |
 | |_) | |_| || || |___| |_| | |___|  _ <
 |____/ \___/|___|_____|____/|_____|_| \_\
*************************************************/

class domBuilder{

    constructor(){

      this.cssBuilder = new cssBuilder();

    }

    buildElemes ( obj) {

        obj.dom = this.getDom( obj );

        this.getCss( obj, obj.dom, 'default' );
        this.getEvents( obj, obj.dom);

        return obj.dom;
    }
    getDom ( obj ) {
        let $el = document.createElement( obj.el );
        $el.innerHTML = obj.content;
        for( let key in obj.attr ) $el.setAttribute( key, obj.attr[key] );

        return $el;
    }
    getCss ( obj, dom, key = 'default' ) {
        dom.className = key +'_'+ obj.class;
        this.cssBuilder.addStyle( '.'+dom.className, obj.css[ key ]);
        return this;
    }
    getEvents ( obj , dom) {
        var i = obj.events.length - 1;
        for (; i >= 0; i--) {
            dom.addEventListener( obj.events[ i ].name, obj.events[ i ].fn );
        }
        return this;
    }

}
/***********************************************
  ____  _   _ ___ _     ____  _____ ____
 | __ )| | | |_ _| |   |  _ \| ____|  _ \
 |  _ \| | | || || |   | | | |  _| | |_) |
 | |_) | |_| || || |___| |_| | |___|  _ <
 |____/ \___/|___|_____|____/|_____|_| \_\
************************************************/

class cssBuilder{

    /**
     *
     */
    constructor(){
        this.parent  = this._addBalise();
        this.hasProp = {}.hasOwnProperty;
        this.custom  = [];
    }


    _buildStyle( sSelect, oCss){
      var sReturn= '', sProp, sValue,  tmp = [];

      for (sProp in oCss) {
          if ( !this.hasProp.call( oCss, sProp)) continue;
          sValue = oCss[sProp];
          if( typeof sValue == "object"){
              this.custom.push(
                  this._buildStyle( sProp.replace('$', sSelect), sValue)
              );
          }else{
            tmp.push( "" + sProp + ":" + sValue);
          }
      }

      return sSelect + " { " + tmp.join(';') + "; }";
    }

    /**
     *
     */
    addStyle( sSelect, oCss){


        this.parent.insertAdjacentText(
            'beforeend',
            this._buildStyle( sSelect, oCss)
        );

        while( this.custom.length){
          this.parent.insertAdjacentText(
              'beforeend',
              this.custom.shift()
          );
        }
    }

    /**
     *
     */
    _addBalise(){
        let oParent  = document.createElement('style');
        oParent.type = 'text/css';
        document.head.appendChild( oParent);
        return oParent;
    }
}

/*********************************************
  ___    _      _
 |_ _|__| | ___| |__  _   _  __ _
  | |/ _` |/ _ \ '_ \| | | |/ _` |
  | | (_| |  __/ |_) | |_| | (_| |
 |___\__,_|\___|_.__/ \__,_|\__, |
                            |___/
*********************************************/


class Idebug {
    constructor ( bForce = false) {

        if( !mobileAndTabletcheck() && !bForce){
          return false;
        }

        this.aJsCmdHistory = [];
        this.iJsCmdHistoryState = -1;
        this.objects    = [];
        this.domBuilder = new domBuilder();
        console.log     = this.debug.bind(this);
        window.addEventListener('error', function(e){
            e.preventDefault();
        })
        window.onerror  = this.errorCatcher.bind(this);


        this.console = {
            class       : 'consoleLog',
            el          : "div",
            attr        : {},
            events      : [],
            content     : "",
            css         : {
                default     : {
                    '$.close'           : {
                                            top    : "calc( 100% - 40px )",
                                            bottom : "auto"
                                          },
                    '$.expand'          : {
                                            'max-height': "90vh",
                                            height      : "90vh"
                                          },
                    'z-index'           : 9999999,
                    position            : 'fixed',
                    top                 : 'auto',
                    bottom              : "0px",
                    left                : "0px",
                    width               : "100%",
                    height              : "300px",
                    'background-color'  : "#e4e3e3",
                    padding             : "0 0 30px 0",
                    margin              : "0",
                    'box-sizing'        : "border-box",
                    'max-height'        : "300px",
                    'font-family'       : "Arial",
                    'font-size'         : "12px"
                }
            }
        };

        this.consoleTools = {
            class       : 'consoleLogTools',
            el          : "div",
            attr        : {},
            events      : [],
            content     : "",
            css         : {
                default     : {
                    position            : "relative",
                    width               : "100%",
                    height              : "40px",
                    'background-color'  : "rgb(58, 54, 54)",
                    'box-sizing'        : "border-box",
                }
            }
        };


        this.clear = {
            class       : 'consoleClear',
            el          : "div",
            attr        : {},
            content     : "vider",
            events      : [{
                name    : 'click',
                fn      : this.clearConsole.bind(this)
            }],
            css         : {
                default : {
                    position            : "absolute",
                    top                 : "0",
                    bottom              : "0",
                    right               : "0",

                    height              : "100%",
                    'background-color'  : "#cc3575",
                    color               : "white",
                    cursor              : "pointer",
                    padding             : "12px",
                    'box-sizing'        : "border-box",
                    cursor              : "pointer"
                }
            }
        };

        this.toggle = {
            class       : 'consoleToggle',
            el          : "div",
            attr        : {},
            content     : "cacher",
            events      : [{
                name    : 'click',
                fn      : this.toggleConsole.bind(this)
            }],
            css         : {
                default : {
                    position            : "absolute",
                    top                 : "0",
                    bottom              : "0",
                    left                : '10px',
                    margin              : "auto",

                    height              : "15px",
                    'background-color'     : "rgb(76, 72, 72)",
                    color               : "white",
                    padding             : "5px",
                    'border-radius'        : "2px",
                    border              : "solid 1px #716d6d",
                    cursor              : "pointer"
                }
            }
        };

        this.expand = {
            class       : 'consoleExpand',
            el          : "div",
            attr        : {},
            content     : "agrandir",
            events      : [{
                name    : 'click',
                fn      : this.expandConsole.bind(this)
            }],
            css         : {
                default : {
                    position            : "absolute",
                    top                 : "0",
                    bottom              : "0",
                    margin              : "auto",
                    left                : '70px',

                    height              : "15px",
                    'background-color'  : "rgb(76, 72, 72)",
                    color               : "white",
                    padding             : "5px",
                    'border-radius'     : "2px",
                    border              : "solid 1px #716d6d",
                    cursor              : "pointer"
                }
            }
        };

        this.consoleWrap = {
            class       : 'consoleWrap',
            el          : "div",
            attr        : {},
            content     : "",
            events      : [],
            css         : {
                default : {
                    padding                 : "0",
                    margin                  : 0,
                    height                  : "calc( 100% - 40px )",
                    color                   : "#3c3737",
                    'background-color'      : "white",
                    'overflow-y'            : 'scroll'
                }
            }
        };

        this.consoleLine = {
            class       : 'consoleLine',
            el          : "pre",
            attr        : {},
            content     : "",
            events      : [],
            css         : {
                default : {
                    position                : "relative",
                    display                 : "block",
                    padding                 : "5px 25px",
                    margin                  : 0,
                    'line-height'           : "20px",
                    '$:nth-child(even)'           : {
                        'background-color'    : "#f7f7f7"
                    },
                }
            }
        };

        this.consoleError = {
            class       : 'consoleError',
            el          : "pre",
            attr        : {},
            content     : "",
            events      : [],
            css         : {
                default : {
                    position                : "relative",
                    display                 : "block",
                    padding                 : "5px 25px",
                    margin                  : 0,
                    'line-height'           : "20px",
                    color                   : "#e01111",
                    'background-color'        : '#ffefef',
                    '$ span span'           : {
                        'float'    : "right"
                    },
                }
            }
        };

        this.consoleCount = {
            class       : 'consoleCount',
            el          : "span",
            attr        : {},
            content     : 0,
            events      : [],
            css         : {
                default : {
                    position            : "absolute",
                    height              : "100%",
                    left                : "0",
                    top                 : "0",
                    'background-color'  : "#efeeee",
                    padding             : "5px",
                    color               : "#9c9b9b"
                }
            }
        };

        this.consoleInput = {
            class       : 'consoleInput',
            el          : "input",
            attr        : {
                    'type' : 'text',
                    placeholder : 'javascript...'
            },
            content     : "",
            events      : [{
                name    : 'keyup',
                fn      : this.execJsDispatch.bind(this)
            }],
            css         : {
                default : {
                    position            : "absolute",
                    height              : "30px",
                    width               : "100%",
                    left                : "0",
                    bottom              : "0",
                    padding             : "5px 15px",
                    color               : "#9c9b9b",
                    'box-sizing'        : "border-box",
                    border              : 0
                }
            }
        }

        this.domBuilder.buildElemes( this.console);
        this.domBuilder.buildElemes( this.consoleTools);
        this.domBuilder.buildElemes( this.consoleLine);
        this.domBuilder.buildElemes( this.consoleCount);
        this.domBuilder.buildElemes( this.consoleInput);
        this.domBuilder.buildElemes( this.consoleError);


        this.consoleTools.dom.appendChild( this.domBuilder.buildElemes( this.clear) );
        this.consoleTools.dom.appendChild( this.domBuilder.buildElemes( this.toggle) );
        this.consoleTools.dom.appendChild( this.domBuilder.buildElemes( this.expand) );

        this.console.dom.appendChild( this.consoleTools.dom );
        this.console.dom.appendChild( this.consoleInput.dom );
        this.console.dom.appendChild( this.domBuilder.buildElemes( this.consoleWrap) );

        document.body.appendChild( this.console.dom );

        this.line = 0;
    }

    debug () {
        console.time('build');
        for( let key in arguments ){
            let line = this.getLine();
            let msg  = this.getMsg( arguments[key] );
            line.appendChild( msg );
            this.consoleWrap.dom.appendChild(  line );
        }
        this.consoleWrap.dom.scrollTop = this.consoleWrap.dom.scrollHeight;
        console.timeEnd('build');
    }

    getLine( _elConsole) {
        var elConsole =  _elConsole|| this.consoleLine,
            el        = elConsole.dom.cloneNode(true);
        this.consoleCount.content++;
        this.consoleCount.dom.textContent = this.consoleCount.content;
        el.appendChild( this.consoleCount.dom.cloneNode(true) );
        return el;
    }

    getMsg( _msg ) {
        let $return = document.createElement('span');
        var msg     = _msg || 'undefined',
            sConst  = (msg != 'undefined')? msg.constructor + '' : msg,
            sReturn = '',
            oRegex  = /(function |\(\) \{ \[native code\] \})/g,
            sName   = sConst.replace( oRegex, '');

        sReturn = sName+ " " + JSON.stringify( msg, null, 2) + "";

        if( sName === 'Function'){
          sReturn = sName +' '+ msg;
        }

        $return.insertAdjacentText('beforeend',sReturn);

        return $return;
    }

    errorCatcher ( errorMsg, url, lineNumber, charNumber, errorMsg2 ) {

        var oDocFragment = document.createDocumentFragment(),
            file         = url.split('/'),
            line         = this.getLine( this.consoleError),
            spanMsg      = document.createElement('span'),
            spanFile     = document.createElement('span'),
            lienFile     = document.createElement('a');

        file = file[file.length-1];

        lienFile.textContent = file;
        lienFile.setAttribute('href', url);
        lienFile.setAttribute('target', '_blank');
        spanFile.appendChild( lienFile);

        spanMsg.appendChild( spanFile);
        spanMsg.insertAdjacentText('afterbegin',errorMsg);
        spanFile.insertAdjacentText('beforeend' , ':' + lineNumber);

        line.appendChild( spanMsg );
        oDocFragment.appendChild( line );

        this.consoleWrap.dom.appendChild( oDocFragment );
        this.consoleWrap.dom.scrollTop = this.consoleWrap.dom.scrollHeight;

        return false;
    }


    clearConsole() {
        this.consoleWrap.dom.textContent = "";
        this.consoleCount.content = 0;
    }

    toggleConsole(){
        this.console.dom.classList.toggle('close');
    }

    expandConsole () {
      this.console.dom.classList.toggle('expand');
    }


    execJsDispatch ( e ) {
        if( e.keyCode === 13 ) this.execJsCmd();
        if( e.keyCode === 38 ) this.getPrevCmd();
        if( e.keyCode === 40 ) this.getNextCmd();
    }

    execJsCmd () {
        let cmd = this.consoleInput.dom.value;

        if( !~cmd.indexOf('console.log')){
            cmd = "console.log("+cmd+")";
        }

        eval(cmd);
        this.clearExec();
        this.aJsCmdHistory.push( cmd );
        this.iJsCmdHistoryState = -1;
    }

    getPrevCmd () {
        this.iJsCmdHistoryState++;
        let key = ( this.aJsCmdHistory.length - 1 ) - this.iJsCmdHistoryState;
        if( typeof this.aJsCmdHistory[key] === "undefined" ){
            this.iJsCmdHistoryState = 0;
            key = ( this.aJsCmdHistory.length - 1 ) - this.iJsCmdHistoryState;
        }
        this.consoleInput.dom.value = this.aJsCmdHistory[ key ];
    }

    getNextCmd () {
        this.iJsCmdHistoryState = ( this.iJsCmdHistoryState > 0 ) ? this.iJsCmdHistoryState - 1 : this.aJsCmdHistory.length - 1;
        let sVal = this.aJsCmdHistory[ this.iJsCmdHistoryState ] || "";
        this.consoleInput.dom.value = sVal;
    }

    clearExec () {
        this.consoleInput.dom.value = '';
    }

}

let debug = new Idebug( true);
console.log( 'test', 'test 2' )
console.log( ['test 3', 'test 4', 2, {prenom : 'julien'}] )
console.log({
    key1:'test 5',
    key2:'test 6',
    key3 : {'key4' : 1, 'key5' : "test", 'key6': {key7:"test"} }
})
let fn = () => {2*3}
console.log( fn );
qsdqsd= qsdqs