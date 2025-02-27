export const CONFIG = {
    models: {
        birkin: {
            name: 'BIRKIN',
            path: './models/birkin.gltf',
            scale: 2
        },
        kelly: {
            name: 'KELLY',
            path: './models/kelly.gltf',
            scale: 2
        },
        minikelly2: {
            name: 'MINIKELLY 2',
            path: './models/minikelly2.gltf',
            scale: 2
        },
        kellypochette: {
            name: 'KELLY POCHETTE',
            path: './models/kellypochette.gltf',
            scale: 2
        }
    },
    materials: {
        togo: {
            name: 'TOGO',
            normalMap: './textures/togo_normal.png',
            roughnessMap: './textures/togo_roughness.png'
        },
        ostrich: {
            name: 'Ostrich',
            normalMap: './textures/ostrich_normal.png',
            roughnessMap: './textures/ostrich_roughness.png'
        },
        // ... 其他材质配置
    },
    colors: {
        body: [
            { name: 'Rose Sakura', hex: '#FFB7C5' },
            { name: 'Gold', hex: '#D4AF37' },
            // ... 更多颜色
        ],
        accent: [
            { name: 'Etoupe', hex: '#8B7355' },
            { name: 'Noir', hex: '#000000' },
            // ... 更多颜色
        ],
        hardware: [
            { name: 'Palladium', hex: '#DADADA' },
            { name: 'Gold', hex: '#D4AF37' },
            // ... 更多颜色
        ]
    }
};