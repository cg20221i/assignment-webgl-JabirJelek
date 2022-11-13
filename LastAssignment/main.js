function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");


    // ID 41

    var vertices = [
        //Number 4
        -0.9, 0.8,
        -0.9, -0.2,
        -0.55, -0.2,
        -0.55, -0.8,
        -0.45, -0.8,
        -0.45, -0.2,
        -0.35, -0.2,
        -0.35, -0.0,
        -0.45, 0.0,
        -0.45, 0.8,
        -0.55, 0.8,
        -0.55, 0.0,
        -0.8, 0.0,
        -0.8, 0.8,


        //Number 1
        -0.35, 0.4,
        -0.35, 0.6,
        -0.2, 0.8,
        -0.1, 0.8,
        -0.1, -0.6, //5
        0.0, -0.6,
        0.0, -0.8,
        -0.2, -0.8,
        -0.35, -0.8,
        -0.35, -0.6,
        -0.25, -0.6, //11
        -0.25, 0.4,
        -0.35, 0.4, //connect to start
        -0.1, 0.4, //14
        -0.25, 0.4,
        -0.17, 0.8,
        -0.1, 0.4,
        -0.25, -0.6,
        -0.25, 0.4,
        -0.1, -0.6,
        0.0, -0.6,
        -0.35, -0.8,
        -0.35, -0.6,
        0.0, -0.8,




        // Letter I-1
        0.13, 0.3,
        0.13, 0.5,
        0.13, 0.8,
        0.33, 0.8,
        0.33, 0.5,
        0.33, 0.3,
        0.23, -0.2,

        // Letter I-2
        0.13, 0.2,
        0.13, -0.8,
        0.33, -0.8,
        0.33, 0.2,




    ];

    // Create a link-list for storing the vertices data in the GPU realm
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // VERTEX SHADER
    var vertexShaderCode = `
        attribute vec2 aPosition;
        void main () { 
            gl_PointSize = 5.0;
            gl_Position = vec4(aPosition, 0.0, 1.0);
            // gl_Position is the final destination for storing
            // positional data  for the rendered vertex
        }
        `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);


    // FRAGMENT SHADER
    var fragmentShaderCode = `
    void main() {
        precision mediump float;
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // change box color
        /* Blue = R:0, G:0, B:1, A:1
        gl_FragColor is the final destination for storing
        color data for the rendered fragment
        */
    }
`;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    /* 

    */
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);



    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition")
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.5, 0.0, 0.0, 0.3); // change bg color
    //R, G, Blue, Alpha
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 14);
    gl.drawArrays(gl.LINE_STRIP, 14, 24);
    gl.drawArrays(gl.TRIANGLE_FAN, 38, 7);
    gl.drawArrays(gl.TRIANGLE_STRIP, 45, 4);

}