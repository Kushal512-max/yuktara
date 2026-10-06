// scripts/data_cga.js
// 20 MCQs per unit for Computer Graphics & Animation (Units 1 to 6)

module.exports = {
  "cga-u1": [
    {
      q: "What is the primary difference between Raster Scan displays and Random Scan (Vector) displays?",
      options: ["Raster scan paints pixels line-by-line across the entire screen from top to bottom; Random scan directs the electron beam only along the lines of the picture", "Random scan uses a frame buffer; raster scan does not", "Raster scan is analog; random scan is digital", "Random scan supports realistic photorealism"],
      answer: 0,
      explanation: "Raster scan refreshes entire rectangular grid row by row; vector displays draw directly from point to point.",
      difficulty: "Beginner"
    },
    {
      q: "In Bresenham's Line Generation Algorithm, what type of arithmetic operations are used exclusively for computing decision parameters?",
      options: ["Floating-point division", "Pure integer addition, subtraction, and bit shifting", "Trigonometric sines and cosines", "Matrix inversions"],
      answer: 1,
      explanation: "Bresenham's breakthrough was formulating the decision parameter using only integer arithmetic, avoiding slow floating-point ops.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Frame Buffer in computer graphics architecture?",
      options: ["A video camera lens", "A dedicated block of memory storing the color or intensity value for each pixel on the screen", "A CPU register", "A cache for textures on disk"],
      answer: 1,
      explanation: "The frame buffer (video memory/VRAM) holds the bitmap image that the video display controller scans out.",
      difficulty: "Beginner"
    },
    {
      q: "What is Aspect Ratio of a display monitor?",
      options: ["The refresh rate in Hertz", "The ratio of the width to the height of the screen image (e.g. 16:9)", "The number of colors supported", "The contrast ratio"],
      answer: 1,
      explanation: "Aspect ratio describes proportional relationship between display width and height.",
      difficulty: "Beginner"
    },
    {
      q: "What is the main drawback of the Digital Differential Analyzer (DDA) line algorithm compared to Bresenham's algorithm?",
      options: ["DDA cannot draw diagonal lines", "DDA requires floating-point arithmetic and rounding operations in every step", "DDA requires 3D coordinates", "DDA is too complex to implement"],
      answer: 1,
      explanation: "DDA computes floating-point incremental steps and applies round() at each pixel, making it slower on older hardware.",
      difficulty: "Beginner"
    },
    {
      q: "In Midpoint Circle Generation algorithm, how many octants need to be calculated explicitly due to 8-way symmetry?",
      options: ["1 octant (45 degrees)", "2 octants", "4 octants", "All 8 octants"],
      answer: 0,
      explanation: "Using 8-way symmetry, computing one octant (x from 0 to y) provides all other 7 points by swapping coordinates and signs.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Aliasing (jaggies) in computer graphics?",
      options: ["Color fading over time", "The visual stair-stepped distortion of continuous lines and curves when mapped to discrete pixel grids", "Screen flicker", "Incorrect lighting"],
      answer: 1,
      explanation: "Aliasing causes jagged stair-stepped artifacts when high-frequency continuous signals are sampled into finite discrete pixels.",
      difficulty: "Beginner"
    },
    {
      q: "What technique blends pixel colors with surrounding background pixels along edges to reduce stair-stepped jaggies?",
      options: ["Dithering", "Antialiasing (e.g. supersampling, MSAA)", "Clipping", "Quantization"],
      answer: 1,
      explanation: "Antialiasing smooths jagged edges by assigning intermediate sub-pixel color intensities along boundaries.",
      difficulty: "Beginner"
    },
    {
      q: "What is the initial decision parameter p0 in Bresenham's line algorithm for slope 0 < m < 1?",
      options: ["p0 = 2Δy - Δx", "p0 = 2Δx - Δy", "p0 = Δy / Δx", "p0 = 0"],
      answer: 0,
      explanation: "At the start point, the initial decision parameter evaluates to p0 = 2Δy - Δx.",
      difficulty: "Intermediate"
    },
    {
      q: "How many bits per pixel (bpp) are required for True Color (24-bit color depth)?",
      options: ["8 bits", "16 bits", "24 bits (8 bits each for Red, Green, Blue)", "32 bits"],
      answer: 2,
      explanation: "True color allocates 8 bits (256 levels) for each of the 3 color channels (R, G, B), totaling 16.7 million colors.",
      difficulty: "Beginner"
    },
    {
      q: "What is the refresh rate of a display monitor?",
      options: ["The number of times per second the display hardware redraws the frame buffer onto the screen (measured in Hz)", "The pixel density", "The maximum resolution", "The video RAM size"],
      answer: 0,
      explanation: "Refresh rate (e.g. 60Hz, 144Hz) defines how frequently the display controller cycles through the frame buffer.",
      difficulty: "Beginner"
    },
    {
      q: "In the Midpoint Circle algorithm for circle radius r centered at origin, what is the initial decision parameter p0?",
      options: ["p0 = 1 - r (or 5/4 - r)", "p0 = 2r", "p0 = r^2", "p0 = 0"],
      answer: 0,
      explanation: "Evaluating the midpoint (1, r - 0.5) in the circle equation yields p0 = 5/4 - r, rounded to 1 - r for integer math.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the Video Controller (Display Controller) do in graphics hardware?",
      options: ["Compiles C++ code", "Reads pixel values continuously from the frame buffer and converts them to signals driving the monitor display", "Applies physics equations", "Stores user input"],
      answer: 1,
      explanation: "The display controller reads frame buffer memory at the video refresh rate and produces raster scan signals.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Dithering in computer graphics?",
      options: ["Increasing polygon count", "Creating the illusion of additional color shades and depth by alternating patterns of available palette pixels", "Smoothing fonts", "Scaling textures"],
      answer: 1,
      explanation: "Dithering interleaves dots of limited palette colors to approximate subtle gradients and shades to the human eye.",
      difficulty: "Intermediate"
    },
    {
      q: "What is horizontal retrace in a CRT or raster scan beam?",
      options: ["The return of the electron beam from the end of a scan line to the start of the next line while blanked", "The beam turning off completely", "Scanning from bottom to top", "Color calibration"],
      answer: 0,
      explanation: "Horizontal retrace is the blanked return sweep of the beam to the left edge of the next raster scanline.",
      difficulty: "Beginner"
    },
    {
      q: "What is vertical retrace (VBLANK)?",
      options: ["The beam resetting from the bottom-right corner to top-left after finishing an entire frame refresh", "A graphics crash", "A line drawing algorithm", "A video compression codec"],
      answer: 0,
      explanation: "Vertical retrace is the blanked interval during which the scan beam moves back to the top of the screen to start the next frame.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Look-Up Table (LUT) / Color Map in indexed color graphics?",
      options: ["A list of screen resolutions", "An array where pixel values in the frame buffer act as pointers/indices to stored color palette entries", "A font table", "A list of GPU drivers"],
      answer: 1,
      explanation: "Indexed color stores smaller indices (e.g. 8-bit) that look up 24-bit RGB values from a color palette LUT.",
      difficulty: "Intermediate"
    },
    {
      q: "Which line algorithm handles all slope octants uniformly without division by swapping coordinates when |m| > 1?",
      options: ["Generalized Bresenham's Algorithm", "Standard DDA", "Midpoint Ellipse", "Polygon Fill"],
      answer: 0,
      explanation: "Generalized Bresenham swaps x and y roles when slope |m| > 1, ensuring single-pixel steps along the major axis.",
      difficulty: "Intermediate"
    },
    {
      q: "What is resolution in display technology?",
      options: ["The number of distinct pixels in each dimension that can be displayed (e.g. 1920 × 1080)", "The physical screen width in inches", "The brightness in nits", "The power consumption"],
      answer: 0,
      explanation: "Resolution specifies horizontal and vertical pixel counts, determining visual sharpness.",
      difficulty: "Beginner"
    },
    {
      q: "What is pixel (picture element)?",
      options: ["The smallest addressable visual element on a digital display grid", "A hardware wire", "A file format", "A mouse cursor"],
      answer: 0,
      explanation: "A pixel is the smallest controllable illuminated element on a digital raster display.",
      difficulty: "Beginner"
    }
  ],
  "cga-u2": [
    {
      q: "What 4-bit region code (outcode) represents a point lying strictly INSIDE the clipping window in the Cohen-Sutherland algorithm?",
      options: ["0000", "1111", "0001", "1000"],
      answer: 0,
      explanation: "The outcode bits represent [Top, Bottom, Right, Left]. A point inside all 4 boundary planes has code 0000.",
      difficulty: "Beginner"
    },
    {
      q: "In Cohen-Sutherland line clipping, when can a line segment with endpoints P1 and P2 be trivially REJECTED (discarded)?",
      options: ["When code(P1) OR code(P2) == 0000", "When code(P1) AND code(P2) != 0000 (bitwise AND is non-zero)", "When both codes are 0000", "When the line slope is 1"],
      answer: 1,
      explanation: "If bitwise AND of both endpoint outcodes is non-zero, both points lie completely outside on the same side of a boundary.",
      difficulty: "Intermediate"
    },
    {
      q: "In Cohen-Sutherland line clipping, when can a line segment be trivially ACCEPTED?",
      options: ["When code(P1) | code(P2) == 0000 (both endpoints have outcode 0000)", "When bitwise AND is 1111", "When line length is 0", "When line is vertical"],
      answer: 0,
      explanation: "If both endpoint outcodes are 0000, both endpoints reside strictly inside the clip window.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Liang-Barsky line clipping algorithm based on?",
      options: ["Parametric line equations (P(u) = P1 + u*(P2 - P1)) and inequalities testing intersections with infinite clipping edges", "4-bit region outcodes", "Subdivision of triangles", "Recursive midpoint search"],
      answer: 0,
      explanation: "Liang-Barsky uses parametric line equations to calculate exact enter/exit parameter values u1 and u2.",
      difficulty: "Intermediate"
    },
    {
      q: "Which polygon clipping algorithm clips a polygon against one clipping boundary plane at a time, generating a new vertex sequence for subsequent stages?",
      options: ["Sutherland-Hodgman Algorithm", "Cohen-Sutherland Algorithm", "Bresenham Algorithm", "DDA Clipper"],
      answer: 0,
      explanation: "Sutherland-Hodgman pipeline clips polygons against Left, Right, Bottom, and Top boundaries sequentially.",
      difficulty: "Intermediate"
    },
    {
      q: "In Sutherland-Hodgman polygon clipping, what output is produced when an edge goes from OUTSIDE the clipping window to INSIDE?",
      options: ["No vertices output", "Intersection point only", "Both Intersection point AND the Inside vertex", "Inside vertex only"],
      answer: 2,
      explanation: "Crossing from outside to inside outputs the boundary intersection point followed by the inside destination vertex.",
      difficulty: "Intermediate"
    },
    {
      q: "What output is produced in Sutherland-Hodgman clipping when traversing an edge from INSIDE to OUTSIDE?",
      options: ["Only the Intersection point", "Both vertices", "No vertices", "Inside vertex only"],
      answer: 0,
      explanation: "Exiting the window generates only the intersection point where the edge pierces the clipping boundary.",
      difficulty: "Intermediate"
    },
    {
      q: "What test determines whether an interior point is inside a complex polygon by counting ray intersections with polygon edges?",
      options: ["Even-Odd Rule (Crossing Test)", "Midpoint rule", "Circle equation", "Outcode test"],
      answer: 0,
      explanation: "The Even-Odd rule casts a ray to infinity; an odd number of boundary edge crossings indicates the point is inside.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Winding Number rule for polygon interior testing?",
      options: ["Counting how many times the polygon boundary winds around the test point (non-zero winding means inside)", "Counting vertices", "Measuring polygon area", "Checking color"],
      answer: 0,
      explanation: "The winding number tracks net revolutions made by the perimeter around the point; non-zero denotes interior.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Scan-Line Polygon Fill algorithm?",
      options: ["A method that draws random dots", "An algorithm that determines edge intersections for each horizontal scanline, sorts them by x, and fills pixels between pairs of intersections", "A 3D mesh generator", "A brush tool"],
      answer: 1,
      explanation: "Scan-line filling finds scanline intersections with polygon edges, sorts by x, and fills spans between odd/even pairs.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Boundary-Fill algorithm?",
      options: ["Starts at an interior seed point and fills connected neighbors until encountering a specified boundary edge color", "Fills entire screen with black", "Clips lines against boundary", "Draws bounding boxes"],
      answer: 0,
      explanation: "Boundary-fill recursively paints neighbor pixels until hitting a designated boundary color.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Flood-Fill algorithm?",
      options: ["Replaces a designated old interior target color with a new replacement fill color across connected pixels starting from a seed point", "Floods computer memory", "Deletes polygons", "Calculates water dynamics"],
      answer: 0,
      explanation: "Flood-fill replaces an existing target color with a replacement fill color, used in paint bucket tools.",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between 4-connected and 8-connected flood fill?",
      options: ["4-connected inspects horizontal/vertical neighbors (N, S, E, W); 8-connected also checks 4 diagonal neighbors", "8-connected uses 8-bit color", "4-connected is 3D", "They produce identical fills"],
      answer: 0,
      explanation: "4-connected checks cardinal directions; 8-connected includes diagonal neighbors, preventing leaks through corner gaps.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Active Edge Table (AET) in scan-line polygon filling?",
      options: ["A list of all polygon edges", "A dynamically maintained list containing only edges that currently intersect the active scanline, sorted by x", "A GPU hardware buffer", "A database of textures"],
      answer: 1,
      explanation: "The AET maintains active edges spanning the current scanline, updated incrementally with scanline progression.",
      difficulty: "Advanced"
    },
    {
      q: "Why is Sutherland-Hodgman polygon clipping problematic for non-convex (concave) polygons?",
      options: ["It produces invalid floating-point numbers", "It can introduce extraneous connecting line segments joining separate polygon parts", "It crashes memory", "It only clips circles"],
      answer: 1,
      explanation: "Sutherland-Hodgman can generate bridge edges across concave notches (Weiler-Atherton solves this).",
      difficulty: "Advanced"
    },
    {
      q: "Which polygon clipping algorithm correctly handles concave polygons with holes by traversing alternating clipping and subject boundaries?",
      options: ["Weiler-Atherton Algorithm", "Cohen-Sutherland", "Bresenham Algorithm", "DDA"],
      answer: 0,
      explanation: "Weiler-Atherton follows entering and exiting vertices along boundaries to output disjoint clipped polygons and holes.",
      difficulty: "Advanced"
    },
    {
      q: "What is a convex polygon?",
      options: ["A polygon where a line segment connecting any two internal points lies entirely inside the polygon", "A polygon with at least one internal angle > 180 degrees", "A polygon with 3 sides", "A circle"],
      answer: 0,
      explanation: "A polygon is convex if all internal angles are <= 180° and all internal chords remain entirely within the shape.",
      difficulty: "Beginner"
    },
    {
      q: "In Cohen-Sutherland outcode, which bit position represents TOP when bits are labeled [Bit 4: Top, Bit 3: Bottom, Bit 2: Right, Bit 1: Left]?",
      options: ["Bit 4 (value 8, 1000)", "Bit 1 (value 1, 0001)", "Bit 2 (value 2, 0010)", "Bit 3 (value 4, 0100)"],
      answer: 0,
      explanation: "Standard convention defines Top as bit 4 (1000 in binary, or value 8).",
      difficulty: "Intermediate"
    },
    {
      q: "What is viewport clipping?",
      options: ["Clipping primitives to the boundaries of the normalized viewport or screen display window", "Deleting files", "Rotating camera", "Changing screen brightness"],
      answer: 0,
      explanation: "Viewport clipping discards visual primitives or sections lying outside the visible display window bounds.",
      difficulty: "Beginner"
    },
    {
      q: "In edge coherence of scan-line polygon fill, how is the x-intersection updated from scanline y to y + 1?",
      options: ["x_{new} = x_{old} + 1/m (where m is edge slope)", "x_{new} = x_{old} * m", "x_{new} = x_{old} + m", "x does not change"],
      answer: 0,
      explanation: "Since dx/dy = 1/m, advancing y by 1 increments x by the reciprocal of the slope: x_{i+1} = x_i + 1/m.",
      difficulty: "Intermediate"
    }
  ],
  "cga-u3": [
    {
      q: "Why are Homogeneous Coordinates used in 2D and 3D computer graphics transformations?",
      options: ["To reduce floating-point numbers", "To represent affine transformations (including Translation, Rotation, Scaling) uniformly as matrix multiplications", "To eliminate the z-axis", "To compress 3D models"],
      answer: 1,
      explanation: "Homogeneous coordinates (adding an extra dimension w=1) allow translation to be expressed as a matrix multiplication.",
      difficulty: "Beginner"
    },
    {
      q: "What is the 2D Translation matrix using homogeneous coordinates for displacements tx and ty?",
      options: ["[[1, 0, tx], [0, 1, ty], [0, 0, 1]]", "[[tx, 0, 0], [0, ty, 0], [0, 0, 1]]", "[[cos θ, -sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]", "[[1, 1, tx], [1, 1, ty], [0, 0, 1]]"],
      answer: 0,
      explanation: "The standard 2D translation matrix has 1s on diagonal, with tx and ty in the third column: [x', y', 1]^T = T * [x, y, 1]^T.",
      difficulty: "Beginner"
    },
    {
      q: "What is the 2D Rotation matrix for rotating a point counter-clockwise by angle θ around the origin (0, 0)?",
      options: ["[[cos θ, -sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]", "[[sin θ, cos θ, 0], [-cos θ, sin θ, 0], [0, 0, 1]]", "[[1, 0, θ], [0, 1, θ], [0, 0, 1]]", "[[cos θ, sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]"],
      answer: 0,
      explanation: "x' = x cos θ - y sin θ and y' = x sin θ + y cos θ, expressed as [[cos θ, -sin θ], [sin θ, cos θ]].",
      difficulty: "Beginner"
    },
    {
      q: "What is the 2D Scaling matrix with scaling factors Sx and Sy relative to the origin?",
      options: ["[[Sx, 0, 0], [0, Sy, 0], [0, 0, 1]]", "[[1, Sx, 0], [Sy, 1, 0], [0, 0, 1]]", "[[0, Sx, 0], [Sy, 0, 0], [0, 0, 1]]", "[[Sx, Sy, 0], [0, 0, 0], [0, 0, 1]]"],
      answer: 0,
      explanation: "Scaling multiplies x by Sx and y by Sy via diagonal matrix entries: [[Sx, 0, 0], [0, Sy, 0], [0, 0, 1]].",
      difficulty: "Beginner"
    },
    {
      q: "What sequence of transformations performs 2D Rotation around an arbitrary pivot point (xp, yp)?",
      options: ["Translate origin to pivot -> Rotate -> Translate back", "Translate pivot to origin T(-xp, -yp) -> Rotate R(θ) -> Translate back T(xp, yp)", "Rotate -> Translate", "Scale -> Rotate"],
      answer: 1,
      explanation: "First translate pivot to origin T(-xp, -yp), apply rotation R(θ) around origin, then translate back T(xp, yp).",
      difficulty: "Intermediate"
    },
    {
      q: "What is Shearing transformation in 2D?",
      options: ["Cutting an object in two", "A transformation that slants the shape of an object along the x or y direction proportional to the other coordinate", "Rotating by 90 degrees", "Scaling uniformly"],
      answer: 1,
      explanation: "Shear shifts coordinate values proportionally: x' = x + sh_x * y, creating a slanted parallelogram effect.",
      difficulty: "Intermediate"
    },
    {
      q: "What transformation produces the mirror image of an object across a coordinate axis?",
      options: ["Translation", "Reflection", "Shear", "Projection"],
      answer: 1,
      explanation: "Reflection produces a mirror image by negating coordinates (e.g. reflection across x-axis negates y).",
      difficulty: "Beginner"
    },
    {
      q: "Is matrix multiplication commutative in composite geometric transformations (i.e., does A * B = B * A)?",
      options: ["Yes, always", "No, matrix multiplication is generally non-commutative (order of transformations matters)", "Only for 3D matrices", "Only when scaling"],
      answer: 1,
      explanation: "Transformations do not commute: translating then rotating yields a completely different result than rotating then translating.",
      difficulty: "Beginner"
    },
    {
      q: "What size matrix is required to represent 3D transformations using homogeneous coordinates?",
      options: ["2 × 2", "3 × 3", "4 × 4", "5 × 5"],
      answer: 2,
      explanation: "3D coordinates (x, y, z, 1) require 4 × 4 transformation matrices in homogeneous coordinates.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Affine Transformation?",
      options: ["A transformation that transforms circles to squares", "A transformation that preserves collinearity (points on a line remain on a line) and ratios of distances along lines", "A non-linear warp", "A random displacement"],
      answer: 1,
      explanation: "Affine transformations preserve straight lines and parallelism (includes translation, rotation, scale, shear).",
      difficulty: "Intermediate"
    },
    {
      q: "What does a reflection across the line y = x do to coordinates (x, y)?",
      options: ["(-x, -y)", "(y, x)", "(-y, -x)", "(x, -y)"],
      answer: 1,
      explanation: "Reflecting across the diagonal line y = x swaps coordinate roles: (x, y) becomes (y, x).",
      difficulty: "Intermediate"
    },
    {
      q: "What is Uniform Scaling in 2D or 3D?",
      options: ["Scaling where Sx = Sy = Sz (aspect ratio is preserved)", "Scaling along x-axis only", "Random scaling", "Inverting coordinates"],
      answer: 0,
      explanation: "Uniform scaling uses identical scale factors across all axes, preserving object proportions without distortion.",
      difficulty: "Beginner"
    },
    {
      q: "What is the inverse of a 2D Translation matrix T(tx, ty)?",
      options: ["T(-tx, -ty)", "T(1/tx, 1/ty)", "T(ty, tx)", "T(tx^2, ty^2)"],
      answer: 0,
      explanation: "To undo a translation by (tx, ty), translate by negative displacement: T(-tx, -ty).",
      difficulty: "Beginner"
    },
    {
      q: "What is the inverse of a 2D Rotation matrix R(θ)?",
      options: ["R(-θ) or the transpose of matrix R", "R(1/θ)", "R(2θ)", "R(θ + 90)"],
      answer: 0,
      explanation: "Rotation matrices are orthogonal; their inverse is simply rotating by -θ, which equals their matrix transpose.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Differential Scaling?",
      options: ["Scaling by derivatives", "Scaling where Sx != Sy (altering the proportions and aspect ratio of the object)", "Continuous smooth scaling", "Scaling by zero"],
      answer: 1,
      explanation: "Differential scaling uses unequal scale factors, stretching or compressing the object along specific dimensions.",
      difficulty: "Beginner"
    },
    {
      q: "In 3D graphics, what is rotation around the Z-axis in right-handed coordinate systems?",
      options: ["Transforms x and y like standard 2D rotation while leaving z coordinate unchanged", "Alters z only", "Inverts camera", "Translates along z"],
      answer: 0,
      explanation: "Z-axis rotation maintains z' = z while rotating x and y according to standard 2D rotation formulas.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the 3D homogeneous coordinate point [X, Y, Z, W] with W != 1 represent in Cartesian 3D space?",
      options: ["[X, Y, Z]", "[X/W, Y/W, Z/W] (perspective division)", "[X*W, Y*W, Z*W]", "[0, 0, 0]"],
      answer: 1,
      explanation: "Homogeneous coordinates are normalized to Cartesian coordinates by dividing through by W (perspective division).",
      difficulty: "Intermediate"
    },
    {
      q: "What is Euler Angle representation of 3D rotations, and what major mathematical issue can it suffer from?",
      options: ["Pitch, Yaw, Roll rotations; suffers from Gimbal Lock (loss of one degree of rotational freedom)", "Matrix scaling; suffers from memory leak", "Vertex colors; suffers from clipping", "Texture coordinates; suffers from blur"],
      answer: 0,
      explanation: "Euler angles describe 3D rotation via 3 sequential axis rotations, susceptible to Gimbal Lock when two axes align.",
      difficulty: "Advanced"
    },
    {
      q: "What mathematical construct avoids Gimbal Lock and provides smooth spherical interpolation (SLERP) for 3D rotations in game engines?",
      options: ["Quaternions (4D hypercomplex numbers)", "2D matrices", "B-Splines", "Vector dots"],
      answer: 0,
      explanation: "Quaternions represent 3D orientation as 4-tuples, enabling compact, singularity-free rotations and smooth interpolation.",
      difficulty: "Advanced"
    },
    {
      q: "What is the Window-to-Viewport transformation?",
      options: ["Resizing browser windows", "Mapping 2D geometric world coordinates within a defined window onto normalized device or viewport screen coordinates", "Minimizing an application", "Switching monitors"],
      answer: 1,
      explanation: "Window-to-viewport maps a rectangular region of world coordinates onto a designated screen viewport region.",
      difficulty: "Intermediate"
    }
  ],
  "cga-u4": [
    {
      q: "Which illumination model calculates diffuse reflection based on Lambert's Cosine Law (I_diff = I_p * k_d * cos θ)?",
      options: ["Lambertian Diffuse Reflection", "Phong Specular Model", "Ray Tracing", "Ambient Occlusion"],
      answer: 0,
      explanation: "Lambert's law states reflected diffuse light intensity is proportional to cosine of angle between light vector and surface normal.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Phong Illumination Model composed of?",
      options: ["Ambient + Diffuse + Specular reflection", "Shadow + Light only", "Direct sunlight + Moon", "RGB colors"],
      answer: 0,
      explanation: "The classic Phong model combines uniform Ambient light, Lambertian Diffuse reflection, and shiny Specular highlights.",
      difficulty: "Beginner"
    },
    {
      q: "How does Gouraud Shading interpolate lighting across a polygon surface?",
      options: ["Calculates lighting once per polygon", "Calculates lighting intensity at polygon vertices and linearly interpolates intensity across the interior pixels", "Calculates lighting per pixel using interpolated surface normals", "Uses ray marching"],
      answer: 1,
      explanation: "Gouraud shading evaluates vertex colors and bilinearly interpolates intensities across scanlines.",
      difficulty: "Intermediate"
    },
    {
      q: "How does Phong Shading differ from Gouraud Shading?",
      options: ["Phong interpolates surface normal vectors across polygon pixels and evaluates the lighting model at every individual pixel", "Phong is faster than Gouraud", "Gouraud calculates per-pixel normals", "Phong only works for flat surfaces"],
      answer: 0,
      explanation: "Phong shading interpolates surface normals across the polygon and recalculates lighting equations per-pixel, producing crisp specular highlights.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Flat Shading (Constant Shading)?",
      options: ["Calculates lighting once using a single surface normal for the entire polygon and paints all pixels with that identical color", "Paints without color", "Shades using textures only", "Uses 3D ray tracing"],
      answer: 0,
      explanation: "Flat shading computes lighting once per facet, resulting in visible polygonal facet boundaries.",
      difficulty: "Beginner"
    },
    {
      q: "In the RGB Color Model, what secondary color is produced by combining full Red and full Green light (255, 255, 0)?",
      options: ["Magenta", "Cyan", "Yellow", "White"],
      answer: 2,
      explanation: "In additive RGB lighting, mixing Red and Green wavelengths produces Yellow.",
      difficulty: "Beginner"
    },
    {
      q: "Which color model is Subtractive and used predominantly in color printing?",
      options: ["RGB", "CMYK (Cyan, Magenta, Yellow, Key/Black)", "HSV", "HSL"],
      answer: 1,
      explanation: "CMYK is subtractive: ink pigments absorb specific light wavelengths reflected from paper.",
      difficulty: "Beginner"
    },
    {
      q: "What do the three dimensions of the HSV color model represent?",
      options: ["Height, Surface, Vector", "Hue (color angle), Saturation (vibrancy), Value (brightness)", "Heat, Shade, Vapor", "Horizontal, Slant, Vertical"],
      answer: 1,
      explanation: "HSV maps color to intuitive artistic parameters: Hue (0-360°), Saturation (0-100%), and Value (0-100%).",
      difficulty: "Beginner"
    },
    {
      q: "What is Ambient Light in computer graphics illumination?",
      options: ["Direct glare from headlights", "A constant background illumination resulting from multiple diffuse reflections from all room surfaces, illuminating all objects equally", "Flashlight beam", "Neon glow"],
      answer: 1,
      explanation: "Ambient light approximates indirect scattered environmental light, ensuring unlit surfaces are not pitch black.",
      difficulty: "Beginner"
    },
    {
      q: "What controls the size and sharpness of the specular highlight in the Phong illumination model (cos^n α)?",
      options: ["Ambient coefficient", "Specular reflection exponent n (shininess factor)", "Color hue", "Polygon area"],
      answer: 1,
      explanation: "Higher shininess exponent n concentrates the highlight into a smaller, tighter, glossier bright spot.",
      difficulty: "Intermediate"
    },
    {
      q: "How many control points define a standard Cubic Bézier curve?",
      options: ["2", "3", "4", "5"],
      answer: 2,
      explanation: "A cubic Bézier curve is governed by 4 control points: P0 (start), P1, P2 (tangent handles), and P3 (end).",
      difficulty: "Beginner"
    },
    {
      q: "What mathematical polynomials form the blending basis functions of a Bézier curve?",
      options: ["Fourier Series", "Bernstein Polynomials", "Taylor Series", "Lagrange Multipliers"],
      answer: 1,
      explanation: "Bézier curves sum control points weighted by Bernstein basis polynomials: B_{i,n}(t) = C(n,i) t^i (1-t)^{n-i}.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Convex Hull property of Bézier curves?",
      options: ["The curve never bends", "The entire generated curve is guaranteed to lie completely within the convex polygon formed by connecting its control points", "The curve passes through all control points", "The curve is a closed circle"],
      answer: 1,
      explanation: "Because Bernstein basis polynomials sum to 1, the curve is a convex combination strictly bounded inside control point hull.",
      difficulty: "Intermediate"
    },
    {
      q: "Why are B-Spline curves often preferred over high-degree Bézier curves in CAD modeling?",
      options: ["B-Splines offer local control: moving a control point affects only nearby curve segments rather than the entire global curve", "B-Splines require no math", "B-Splines cannot be curved", "B-Splines only work in 2D"],
      answer: 0,
      explanation: "B-Splines decouple curve order from control point count, providing local control where editing points does not alter far segments.",
      difficulty: "Advanced"
    },
    {
      q: "What does NURBS stand for in 3D surface modeling?",
      options: ["New Universal Rendering Binary System", "Non-Uniform Rational B-Splines", "Network Unified Raster Bitmap Shading", "Non-linear Uniform Ray Base Shader"],
      answer: 1,
      explanation: "NURBS provides mathematical precision for modeling both freeform organic curves and analytic geometric shapes (spheres, cones).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Blinn-Phong shading model modification over the standard Phong model?",
      options: ["Uses ray tracing instead", "Uses the Halfway vector H = (L + V)/|L + V| instead of reflecting light vectors, significantly accelerating computation", "Eliminates diffuse light", "Uses 8-bit integers"],
      answer: 1,
      explanation: "Blinn-Phong uses the halfway vector between light and view direction, avoiding expensive reflection vector calculations.",
      difficulty: "Advanced"
    },
    {
      q: "What visual artifact commonly affects Gouraud shading on low-poly meshes?",
      options: ["Mach Banding (perceptual exaggerated bands at derivative intensity discontinuities along edges)", "Pixelation", "Inverted colors", "Z-fighting"],
      answer: 0,
      explanation: "Mach bands are visual artifacts caused by human optical exaggeration of linear intensity gradient discontinuities across edges.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Specular Reflection?",
      options: ["Dull matte reflection", "Bright, mirror-like reflection of light that causes highlights on polished or glossy surfaces", "Light trapped in fog", "Light emitted by lasers"],
      answer: 1,
      explanation: "Specular reflection bounces light preferentially in the direction of the reflection angle, creating shiny highlights.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of Bump Mapping?",
      options: ["Deforms the actual polygon geometry mesh", "Simulates bumps and wrinkles on a surface by perturbing the surface normal vectors without modifying the actual underlying polygon mesh", "Applies collision physics", "Smoothes jagged textures"],
      answer: 1,
      explanation: "Bump mapping perturbs surface normals before lighting calculations, creating the visual illusion of texture depth.",
      difficulty: "Intermediate"
    },
    {
      q: "How does Normal Mapping improve upon standard grayscale Bump Mapping?",
      options: ["Stores full 3D normal vector perturbations directly into the RGB color channels of a normal map texture", "Uses ray marching", "Doubles polygon vertices", "Generates audio waves"],
      answer: 0,
      explanation: "Normal maps store tangent-space (x, y, z) normal vectors in the (R, G, B) texture channels.",
      difficulty: "Intermediate"
    }
  ],
  "cga-u5": [
    {
      q: "Which of the following is one of the classic 12 Principles of Animation developed by Disney animators?",
      options: ["Squash and Stretch", "Binary Search", "Rasterization", "Ray Tracing"],
      answer: 0,
      explanation: "Squash and Stretch conveys weight, flexibility, and mass to animated characters and objects.",
      difficulty: "Beginner"
    },
    {
      q: "What is Keyframing in computer animation?",
      options: ["Pressing keys on a keyboard", "Defining the starting and ending critical pose frames of a motion sequence, while intermediate frames are interpolated", "Locking animation files", "Drawing every frame by hand"],
      answer: 1,
      explanation: "Keyframes define major poses at specific timestamps; software generates the intermediate frames between them.",
      difficulty: "Beginner"
    },
    {
      q: "What is the term for automatically generating intermediate frames between two keyframes in digital animation?",
      options: ["In-betweening (Tweening)", "Keying", "Rotoscoping", "Rigging"],
      answer: 0,
      explanation: "Tweening (short for in-betweening) interpolates position, rotation, and scale between designated keyframes.",
      difficulty: "Beginner"
    },
    {
      q: "What is Forward Kinematics (FK) in character skeletal animation?",
      options: ["Calculating end-effector position by specifying rotation angles of parent joints down the hierarchical kinematic chain", "Placing the hand and having elbows compute automatically", "Simulating gravity", "Animating clothes"],
      answer: 0,
      explanation: "FK computes positions from the root outwards: rotating the shoulder rotates the arm, which moves the hand.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Inverse Kinematics (IK)?",
      options: ["Moving parent joints to move children", "Specifying the desired position of the end-effector (e.g. hand or foot) and mathematically solving the required rotations of all parent joints", "Reversing animation playback", "Scaling skeletons down"],
      answer: 1,
      explanation: "IK calculates parent joint angles needed to position an end-effector at a target location (e.g. foot on uneven terrain).",
      difficulty: "Intermediate"
    },
    {
      q: "What is Onion Skinning in 2D animation software?",
      options: ["Peeling texture maps", "A feature that displays translucent ghosted silhouettes of previous and upcoming frames simultaneously to assist timing and spacing", "Layering vegetables in UI", "Compressing SVG assets"],
      answer: 1,
      explanation: "Onion skinning superimposes faint previews of neighboring frames so animators can visualize motion flow.",
      difficulty: "Beginner"
    },
    {
      q: "What is Morphing in digital visual effects?",
      options: ["A special effects technique that smoothly transforms one image or 3D object into another through seamless shape interpolation and cross-dissolving", "Scaling an image", "Rotating an asset", "Converting PNG to JPG"],
      answer: 0,
      explanation: "Morphing combines geometric warping and color cross-dissolving to transition seamlessly between two subjects.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Animation Principle of 'Anticipation'?",
      options: ["Waiting for video to buffer", "A preparatory movement or action that cues the audience that a major action is about to take place (e.g. crouching before jumping)", "Ending a scene abruptly", "Speeding up video"],
      answer: 1,
      explanation: "Anticipation prepares viewers for what is to follow, making physical actions believable and readable.",
      difficulty: "Beginner"
    },
    {
      q: "What does 'Ease-In and Ease-Out' (Slow-In and Slow-Out) replicate in realistic animation physics?",
      options: ["Inertia and acceleration: objects start moving gradually, reach maximum speed, and decelerate to a stop rather than moving linearly", "Instantaneous teleportation", "Constant velocity motion", "Flipping directions randomly"],
      answer: 0,
      explanation: "Natural physical motion involves acceleration and deceleration curves rather than abrupt robotic linear movement.",
      difficulty: "Beginner"
    },
    {
      q: "What is Rigging in 3D character animation?",
      options: ["Writing cheat codes", "Creating an underlying digital skeletal bone structure and joint hierarchy to control and deform a 3D character mesh", "Lighting a scene", "Texturing a building"],
      answer: 1,
      explanation: "Rigging binds a skeleton of bones and controls to a polygonal mesh, allowing animators to pose characters.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Skinning (Weight Painting) in 3D character setup?",
      options: ["Drawing character skin textures", "Assigning vertex weights to determine how much influence each skeleton bone exerts on nearby surface mesh vertices during deformation", "Applying normal maps", "Deleting internal polygons"],
      answer: 1,
      explanation: "Skinning binds mesh vertices to bones with weighting coefficients, preventing unnatural collapsing at joints.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Stop Motion animation?",
      options: ["Pausing a game", "An animation technique where physical objects are physically moved in tiny increments and photographed frame-by-frame", "A bug in rendering engines", "GPU lag"],
      answer: 1,
      explanation: "Stop motion captures sequential still photographs of tangible puppets or clay figures moved by hand between shots.",
      difficulty: "Beginner"
    },
    {
      q: "What is Motion Capture (Mocap)?",
      options: ["Recording screenshots", "Recording real-world movement of human actors or objects using optical markers/sensors and mapping that data onto digital 3D character rigs", "Screen recording software", "Video streaming"],
      answer: 1,
      explanation: "Motion capture tracks physical performers via marker suits to produce realistic animated skeleton data.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Animation Principle of 'Secondary Action'?",
      options: ["A backup animation file", "An additional supplementary action that enriches and supports the main action (e.g. arms swinging or hair swaying while walking)", "Second camera angle", "The antagonist's movement"],
      answer: 1,
      explanation: "Secondary actions add realistic nuance and depth to a character's primary movement.",
      difficulty: "Intermediate"
    },
    {
      q: "What is 'Follow Through and Overlapping Action' in animation?",
      options: ["Unrelated scenes playing together", "Different body parts continue moving after the character stops (follow through), and different parts move at different rates (overlap)", "Playing video backwards", "Drawing outlines twice"],
      answer: 1,
      explanation: "Follow-through reflects inertia: when a character stops abruptly, hair, clothing, and loose limbs continue forward briefly.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Frame Rate in animation and video playback?",
      options: ["The speed of sound", "The frequency at which consecutive individual frames are displayed per second (measured in fps, e.g. 24fps, 60fps)", "The size of pixels", "The resolution of the camera"],
      answer: 1,
      explanation: "Frame rate (frames per second / fps) determines visual motion smoothness; cinematic film is traditionally 24 fps.",
      difficulty: "Beginner"
    },
    {
      q: "What is Rotoscoping?",
      options: ["Rotating 3D models", "Tracing over live-action film footage frame by frame to produce realistic animation or composite matte cutouts", "Applying blur filters", "Drawing circles"],
      answer: 1,
      explanation: "Rotoscoping projects live-action footage for artists to trace real human movement or isolate elements.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Particle System in 3D computer graphics animation?",
      options: ["Atom simulation software", "A technique that uses an aggregate of large numbers of tiny graphic sprites to simulate fuzzy chaotic phenomena like fire, smoke, rain, and sparks", "Physics engine for rigid bodies", "Audio equalizer"],
      answer: 1,
      explanation: "Particle systems animate hundreds or thousands of reactive miniature sprites governed by physics emitters.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Morph Target (Blend Shape) animation used primarily for in 3D character work?",
      options: ["Walking cycles", "Facial expressions and speech phoneme lip-syncing by blending between predefined facial target meshes", "Clothing physics", "Vehicles"],
      answer: 1,
      explanation: "Blend shapes linearly interpolate vertex offsets between neutral and target expressions (smile, blink, speech shapes).",
      difficulty: "Intermediate"
    },
    {
      q: "What does an Animation Curve (F-Curve) editor in 3D software represent?",
      options: ["A curve showing polygon wireframe", "A 2D graph plotting an animated property's value (position, rotation) against time, with tangent handles to adjust easing", "CPU usage over time", "Color grading histogram"],
      answer: 1,
      explanation: "F-Curve graphs plot animation values across timeline frames, allowing animators to fine-tune bezier interpolation.",
      difficulty: "Intermediate"
    }
  ],
  "cga-u6": [
    {
      q: "What is the fundamental building block of all entities in a Unity scene?",
      options: ["GameObject", "Shader", "Prefab", "Rigidbody"],
      answer: 0,
      explanation: "Every object in a Unity scene (characters, lights, cameras, props) is a GameObject.",
      difficulty: "Beginner"
    },
    {
      q: "Which Component is mandatory and exists on EVERY GameObject in Unity to define its position, rotation, and scale?",
      options: ["MeshRenderer", "Transform", "Collider", "AudioSource"],
      answer: 1,
      explanation: "The Transform component is intrinsic to all GameObjects, specifying 3D position, rotation, and scale.",
      difficulty: "Beginner"
    },
    {
      q: "In Unity C# scripting, what is the key difference between the Update() and FixedUpdate() lifecycle methods?",
      options: ["Update() runs once per rendered frame (variable delta time); FixedUpdate() runs on a strictly consistent fixed timer synced with the physics engine", "FixedUpdate() is deprecated", "Update() is for physics only", "FixedUpdate() runs only once"],
      answer: 0,
      explanation: "FixedUpdate() runs at deterministic intervals for physics calculations (default 0.02s); Update() varies with frame rate.",
      difficulty: "Intermediate"
    },
    {
      q: "Which Unity component enables a GameObject to be influenced by real-time physics, gravity, and forces?",
      options: ["BoxCollider", "Rigidbody", "MeshFilter", "Animator"],
      answer: 1,
      explanation: "Attaching a Rigidbody component brings the GameObject under the control of the PhysX physics engine.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Prefab in Unity?",
      options: ["A pre-rendered cutscene", "A reusable, pre-configured asset template that can be instantiated multiple times across scenes while sharing properties", "A 3D modeling tool", "A sound effect file"],
      answer: 1,
      explanation: "Prefabs act as asset templates; modifying the master prefab propagates updates across all instantiated clones.",
      difficulty: "Beginner"
    },
    {
      q: "What happens when you check the 'Is Trigger' property on a 3D Collider in Unity?",
      options: ["The collider explodes", "The collider stops physical solid collisions and allows objects to pass through, firing OnTriggerEnter events instead of OnCollisionEnter", "The object becomes invisible", "Gravity is doubled"],
      answer: 1,
      explanation: "Trigger colliders disable solid physical repulsion while detecting overlap events via OnTriggerEnter/Exit callbacks.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Raycasting in Unity game development?",
      options: ["Sending network packets", "Projecting an invisible mathematical ray from a point in a given direction to detect intersections with colliders in the scene", "Drawing rays of light", "Audio raytracing"],
      answer: 1,
      explanation: "Physics.Raycast casts a ray through the 3D world to detect object hits, line-of-sight, and mouse clicks.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the difference between Perspective and Orthographic camera projections in Unity?",
      options: ["Perspective mimics human vision where distant objects appear smaller; Orthographic projects parallel rays with no depth foreshortening (used in 2D and isometric games)", "Orthographic is faster than perspective", "Perspective only works in 2D", "They are identical"],
      answer: 0,
      explanation: "Perspective camera scales with distance; orthographic maintains uniform parallel sizing regardless of distance.",
      difficulty: "Beginner"
    },
    {
      q: "Which Unity C# lifecycle method executes FIRST when a script instance is initialized, even before Start()?",
      options: ["Awake()", "Start()", "Update()", "OnEnable()"],
      answer: 0,
      explanation: "Awake() is called first when the scene loads to initialize variables before any Start() methods fire.",
      difficulty: "Intermediate"
    },
    {
      q: "How do you access another component (e.g. Rigidbody) attached to the same GameObject in a Unity C# script?",
      options: ["GetComponent<Rigidbody>()", "FindObject<Rigidbody>()", "this.Rigidbody", "new Rigidbody()"],
      answer: 0,
      explanation: "GetComponent<T>() queries the GameObject's component list and returns the reference of matching type.",
      difficulty: "Beginner"
    },
    {
      q: "What is Time.deltaTime in Unity C# scripting, and why is it used?",
      options: ["The current clock time", "The time elapsed in seconds since the previous rendered frame, used to make movement frame-rate independent (e.g. speed * Time.deltaTime)", "The game frame rate", "A countdown timer"],
      answer: 1,
      explanation: "Multiplying speeds by Time.deltaTime ensures consistent physical movement speed across variable frame rates.",
      difficulty: "Beginner"
    },
    {
      q: "What is a NavMesh (Navigation Mesh) in Unity?",
      options: ["A 3D water texture", "A geometric representation of walkable surfaces in the scene used for AI pathfinding and navigation", "A network multiplayer grid", "A collision wireframe"],
      answer: 1,
      explanation: "NavMesh defines walkable surfaces, allowing NavMeshAgent components to calculate paths and avoid obstacles.",
      difficulty: "Intermediate"
    },
    {
      q: "Which shader type calculates lighting across standard realistic materials using metallic and smoothness maps in Unity?",
      options: ["Unlit Shader", "Standard PBR (Physically Based Rendering) Shader", "Toon Shader", "Wireframe Shader"],
      answer: 1,
      explanation: "Standard PBR shaders accurately simulate real-world material physics using albedo, metallic, roughness, and normal maps.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of the Asset Store in Unity?",
      options: ["A place to buy physical merchandise", "An online marketplace where developers can download and purchase 3D models, textures, audio, tools, and code plugins", "A local folder on disk", "A database of textures"],
      answer: 1,
      explanation: "The Unity Asset Store provides thousands of community and official tools, models, and scripts for developers.",
      difficulty: "Beginner"
    },
    {
      q: "What does the Tag system in Unity do?",
      options: ["Styles GameObjects with CSS", "Assigns word markers (e.g. 'Player', 'Enemy') to GameObjects to identify and categorize them quickly in code via CompareTag()", "Compresses assets", "Renames scenes"],
      answer: 1,
      explanation: "Tags serve as identification labels for querying or filtering GameObjects (e.g., if (col.CompareTag('Enemy'))).",
      difficulty: "Beginner"
    },
    {
      q: "What is the Layer system in Unity used for?",
      options: ["Sorting UI layers", "Filtering GameObjects for selective camera rendering, raycast masking, and collision matrix separation", "Applying multiple textures", "Saving game states"],
      answer: 1,
      explanation: "Layers (0-31) classify objects for camera culling masks, raycast layers, and physics collision matrix rules.",
      difficulty: "Intermediate"
    },
    {
      q: "What does Instantiate() do in Unity scripting?",
      options: ["Clones an existing GameObject or Prefab and places it into the active scene at a specified position and rotation", "Deletes an object", "Compiles C# scripts", "Renders a camera"],
      answer: 0,
      explanation: "Instantiate(prefab, position, rotation) spawns a dynamic runtime instance of a GameObject/Prefab.",
      difficulty: "Beginner"
    },
    {
      q: "What method permanently destroys a GameObject or component at runtime in Unity?",
      options: ["Destroy(gameObject);", "Delete(gameObject);", "Remove(gameObject);", "Kill(gameObject);"],
      answer: 0,
      explanation: "Destroy(obj) unregisters and deallocates the specified GameObject or component.",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between Local Space and World Space coordinates in Unity?",
      options: ["World Space is relative to the absolute origin (0,0,0) of the scene; Local Space is relative to the GameObject's parent Transform", "Local space is 2D; world space is 3D", "They are identical", "Local space is in inches"],
      answer: 0,
      explanation: "World coordinates specify global position; local coordinates define offsets relative to parent objects.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Animator Controller in Unity?",
      options: ["A hardware gamepad", "A visual state machine asset that manages transitions between different animation clips based on parameter conditions (e.g., speed, isJumping)", "A video editor", "A script that moves cameras"],
      answer: 1,
      explanation: "The Animator Controller uses a hierarchical state machine to blend and transition between character animations.",
      difficulty: "Intermediate"
    }
  ]
};
