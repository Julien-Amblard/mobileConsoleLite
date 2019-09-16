import MobileConsoleLight from "./app"

new MobileConsoleLight(document.querySelector("#app"))

console.log( true )
console.log( "string test" )
console.log( 584584545848 )
console.log( 584584545848 / .3 )
console.log( [1, 2, true, "str", ["str2", 3]] )
console.log( [["str2", [1, 2, 3]]] )
console.log( {a: 1, b: 3, f: [1, 2, false]} )
console.log(
	{
		a: 1, b: 
			{
				c:1, d: 3, h: {
				a: false 
			}
		}
	} 
)