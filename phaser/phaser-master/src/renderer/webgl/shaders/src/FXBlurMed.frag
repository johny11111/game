#define SHADER_NAME BLUR_MED_FS

precision mediump float;

uniform sampler2D uMainSampler;
uniform vec2 resolution;
uniform vec2 offset;
uniform float strength;
uniform vec3 color;

varying vec2 outTexCoord;

void main ()
{
    vec2 uv = outTexCoord;

    vec4 col = vec4(0.0);

    vec2 off1 = vec2(1.3846153846) * offset * strength;
    vec2 off2 = vec2(3.2307692308) * offset * strength;

    col += texture2D(uMainSampler, uv) * 0.2270270270;
    col += texture2D(uMainSampler, uv + (off1 / resolution)) * 0.3162162162;
    col += texture2D(uMainSampler, uv - (off1 / resolution)) * 0.3162162162;
    col += texture2D(uMainSampler, uv + (off2 / resolution)) * 0.0702702703;
    col += texture2D(uMainSampler, uv - (off2 / resolution)) * 0.0702702703;

    gl_FragColor = col * vec4(color, 1.0);
}
