/*
	The Cedric's Swiss Knife (CSK) - CSK 3D toolbox

	Copyright (c) 2015 - 2016 Cédric Ronvel 
	
	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



var Geometry = {} ;
module.exports = Geometry ;



Geometry.dilate	= function( geometry , length )
{
	var i , iMax , j , jMax , face , vertex , normal , vertexNormals ;
	
	// gather vertexNormals from geometry.faces
	
	iMax = geometry.vertices.length ;
	
	vertexNormals = new Array( iMax ) ;
	
	for ( i = 0 ; i < iMax ; i ++ ) { vertexNormals[ i ] = new THREE.Vector3( 0 , 0 , 0 ) ; }
	
	for ( i = 0 , iMax = geometry.faces.length ; i < iMax ; i ++ )
	{
		face = geometry.faces[ i ] ;
		vertexNormals[ face.a ].add( face.vertexNormals[ 0 ] ) ;
		vertexNormals[ face.b ].add( face.vertexNormals[ 1 ] ) ;
		vertexNormals[ face.c ].add( face.vertexNormals[ 2 ] ) ;
	}
	
	for ( i = 0 , iMax = geometry.vertices.length ; i < iMax ; i ++ )
	{
		vertex = geometry.vertices[ i ] ;
		normal = vertexNormals[ i ] ;
		normal.normalize() ;
		
		vertex.x += normal.x * length ;
		vertex.y += normal.y * length ;
		vertex.z += normal.z * length ;
	}
	
	// Return it, so it can be chained
	return geometry ;
} ;

