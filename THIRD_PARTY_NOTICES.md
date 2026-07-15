# Third-Party Software Notices

This project contains or uses third-party software components. Those
components are governed by their own license terms and are not licensed under
this project's MIT License unless their respective notices expressly state
otherwise.

## triangle-wasm

Package: `triangle-wasm`  
Version used: 1.0.0  
Maintainer: Bruno Imbrizi  
Source repository: `brunoimbrizi/triangle-wasm`

`triangle-wasm` is a JavaScript wrapper around Triangle. Its package metadata
declares the wrapper package as MIT licensed.

The package also contains generated JavaScript and a WebAssembly binary named
`triangle.out.wasm`. The WebAssembly binary was compiled from Triangle, a
two-dimensional mesh generator and Delaunay triangulator written by Jonathan
Richard Shewchuk.

The MIT License applicable to this project, and any MIT declaration associated
with the JavaScript wrapper, does not relicense Triangle or the compiled
Triangle WebAssembly binary.

## Triangle

Software: Triangle, version 1.6  
Author: Jonathan Richard Shewchuk

Copyright 1993, 1995, 1997, 1998, 2002, 2005 Jonathan Richard Shewchuk.

Triangle is distributed under its own license terms. It is not distributed
under the MIT License.

Triangle's terms include restrictions concerning redistribution,
compensation, modified versions, availability of source and object code, and
distribution as part of commercial systems. Commercial distribution may
require a direct arrangement with the Triangle author.

Anyone redistributing Triangle, `triangle.out.wasm`, or another binary derived
from Triangle is responsible for reviewing and complying with the complete
original Triangle notice.

## Complete Triangle notice

The complete, unmodified Triangle copyright and redistribution notice is
included in:

`components/mesh/triangle-mesh/TRIANGLE_LICENSE.txt`

That file forms part of these third-party notices. In the event of a conflict
between this summary and the original Triangle notice, the original Triangle
notice controls.

## No relicensing

No third-party software identified in this document is relicensed under this
project's MIT License. References to MIT licensing in this repository apply
only to components for which the relevant copyright holder has granted that
license.
