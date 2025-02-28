import '/style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import { Material } from 'three';
import { TextureLoader } from 'three';


//gui
const gui = new dat.GUI()

// 添加加载管理器
const loadingManager = new THREE.LoadingManager() ;
const loader = new GLTFLoader (loadingManager);

// 添加TextureLoader
const textureLoader = new THREE.TextureLoader(loadingManager);
const swiftNormalTexture = textureLoader.load('/texture/swift-normal.png');
swiftNormalTexture.flipY = false;
swiftNormalTexture.wrapS = THREE.RepeatWrapping;
swiftNormalTexture.wrapT = THREE.RepeatWrapping;
const CONFIG = {
    models: {
        birkin: {
            path: '/model/birkin.gltf',
            scale: 2,
            availableMaterials: ['swift', 'togo', 'chevre', 'ostrich', 'alligator']
        },
        kelly: {
            path: '/model/kelly.gltf',
            scale: 2,
            availableMaterials: ['epsom', 'chevre', 'ostrich']
        },
        minikelly2: {
            path: '/model/minikelly2.gltf',
            scale: 2,
            availableMaterials: ['epsom', 'swift', 'ostrich', 'alligator']
        },
        kellypochette: {
            path: '/model/kellypochette.gltf',
            scale: 2,
            availableMaterials: ['swift']
        }
    },
    materials: {
        swift: {
            normalMap: '/texture/swift-normal.png',
            roughness: 0.65,
            availableColors: {
                body: ['8L BETON', '4B BISCUIT', '37 GOLD', 'D0 BEIGE DE WERMAR', '89 NOIR', 'V0 VERT ROUSSEAU', '3Y CABAN', '46 EBENE', 'I7 BLEU ZELLIGE', '0L GRIS MEYER', '3I VERT CRIQUET'],
                accent: ['8L BETON', '4B BISCUIT', '37 GOLD', 'D0 BEIGE DE WERMAR', '89 NOIR', 'V0 VERT ROUSSEAU', '3Y CABAN', '46 EBENE', 'I7 BLEU ZELLIGE', '0L GRIS MEYER', '3I VERT CRIQUET']
            }
        },
        togo: {
            normalMap: '/texture/togo-normal.png',
            roughness: 0.7,
            availableColors: {
                body: ['10 CRAIE', '80 GREIS PERLE', '8F GRIS ETAIN', '21 NATUREL-SABLE', '4B BISCUIT', '89 NOIR', 'V0 VERT ROUSSEAU', '2Z BLEU NUIT', '0G ROUGE SELLIER', '73 BLEU SAPHIR', '0L GRIS MEYER'],
                accent: ['10 CRAIE', '80 GREIS PERLE', '8F GRIS ETAIN', '21 NATUREL-SABLE', '4B BISCUIT', '89 NOIR', 'V0 VERT ROUSSEAU', '2Z BLEU NUIT', '0G ROUGE SELLIER', '73 BLEU SAPHIR', '0L GRIS MEYER']
            }
        },
        ostrich: {
            normalMap: '/texture/ostrich-normal.png',
            roughness: 0.6,
            availableColors: {
                body: ['3C PARCHEMIN', '3S COGNAC', '81 GRIS TOURTERELLE', '89 NOIR', '6O VERT CYPRES', 'S4 DEEP BLUE', 'U1 VERT VERONE', '8U BLEU GLACIER'],
                accent: ['3C PARCHEMIN', '3S COGNAC', '81 GRIS TOURTERELLE', '89 NOIR', '6O VERT CYPRES', 'S4 DEEP BLUE', 'U1 VERT VERONE', '8U BLEU GLACIER']
            }
        },
        epsom: {
            normalMap: '/texture/epsom-normal.png',
            roughness: 0.5,
            availableColors: {
                body: ['10 CRAIE', '4B BISCUIT', '37 GOLD', '89 NOIR', '73 BLEU SAPHIR', '6O VERT CYPRES', '0G ROUGE SELLIER', '7N BLEU ELECTE', '0L GRIS MEYER', 'O6 VERT ADE'],
                accent: ['10 CRAIE', '4B BISCUIT', '37 GOLD', '89 NOIR', '73 BLEU SAPHIR', '6O VERT CYPRES', '0G ROUGE SELLIER', '7N BLEU ELECTE', '0L GRIS MEYER', 'O6 VERT ADE']
            }
        },
        chevre: {
            normalMap: '/texture/chevre-normal.png',
            roughness: 0.5,
            availableColors: {
                body: ['12 NATA', '18 ETOUPE', '2H KRAFT', '36 BRIQUE', '28 CARAMEL', '89 NOIR', '55 ROUGE H', 'S4 DEEP BLUE', '7U BLEU NAVY', '71 BLEU FRANCE', '3I VERT CRIQUET'],
                accent: ['12 NATA', '18 ETOUPE', '2H KRAFT', '36 BRIQUE', '28 CARAMEL', '89 NOIR', '55 ROUGE H', 'S4 DEEP BLUE', '7U BLEU NAVY', '71 BLEU FRANCE', '3I VERT CRIQUET']
            }
        },
        alligator: {
            normalMap: '/texture/alligator-normal.png',
            roughness: 0.8,
            specular: 0.1,
            availableColors: {
                body: ['Y1 VANILLE', '37 GOLD', '89 NOIR', '73 BLEU SAPHIR', 'V0 VERT ROUSSEAU', '0G ROUGE SELLIER', '6U VERT D\'EAU', 'I7 BLEU ZELLIGE'],
                accent: ['Y1 VANILLE', '37 GOLD', '89 NOIR', '73 BLEU SAPHIR', 'V0 VERT ROUSSEAU', '0G ROUGE SELLIER', '6U VERT D\'EAU', 'I7 BLEU ZELLIGE']
            }
        }
    },
    colors: {
        body: [
            { name: '8L BETON', hex: '#CCCCC4' },
            { name: '4B BISCUIT', hex: '#A97F5A' },
            { name: '37 GOLD', hex: '#9D6E57' },
            { name: 'D0 BEIGE DE WERMAR', hex: '#9F8568' },
            { name: '89 NOIR', hex: '#303030' },
            { name: 'V0 VERT ROUSSEAU', hex: '#3C555A' },
            { name: '3Y CABAN', hex: '#2E3135' },
            { name: '46 EBENE', hex: '#453D3B' },
            { name: 'I7 BLEU ZELLIGE', hex: '#1C4CA4' },
            { name: '0L GRIS MEYER', hex: '#767877' },
            { name: '3I VERT CRIQUET', hex: '#91AA6B' },
            { name: '10 CRAIE', hex: '#F4E5D1' },
            { name: '80 GREIS PERLE', hex: '#9A9C97' },
            { name: '8F GRIS ETAIN', hex: '#565654' },
            { name: '21 NATUREL-SABLE', hex: '#9F8568' },
            { name: '2Z BLEU NUIT', hex: '#313B4B' },
            { name: '0G ROUGE SELLIER', hex: '#43342C' },
            { name: '73 BLEU SAPHIR', hex: '#3B4980' },
            { name: 'I2 NATA', hex: '#DDD4BF' },
            { name: '18 ETOUPE', hex: '#686054' },
            { name: '2H KRAFT', hex: '#977359' },
            { name: '36 BRIQUE', hex: '#A64B2E' },
            { name: '28 CARAMEL', hex: '#825D46' },
            { name: '55 ROUGE H', hex: '#792F27' },
            { name: 'S4 DEEP BLUE', hex: '#486886' },
            { name: '7U BLEU NAVY', hex: '#3C4E67' },
            { name: '71 BLEU FRANCE', hex: '#39568D' },
            { name: '3C PARCHEMIN', hex: '#DCD1BF' },
            { name: '3S COGNAC', hex: '#CC7A4A' },
            { name: '81 GRIS TOURTERELLE', hex: '#AA9B86' },
            { name: '6O VERT CYPRES', hex: '#415F6A' },
            { name: 'U1 VERT VERONE', hex: '#379593' },
            { name: '8U BLEU GLACIER', hex: '#A4ADAD' },
            { name: 'Y1 VANILLE', hex: '#E1CEA2' },
            { name: '6U VERT D\'EAU', hex: '#B2CDC1' },
            { name: '7N BLEU ELECTE', hex: '#68A4B9' },
            { name: 'O6 VERT ADE', hex: '#1B867D' }
        ],
        accent: [
            { name: '8L BETON', hex: '#CCCCC4' },
            { name: '4B BISCUIT', hex: '#A97F5A' },
            { name: '37 GOLD', hex: '#9D6E57' },
            { name: 'D0 BEIGE DE WERMAR', hex: '#9F8568' },
            { name: '89 NOIR', hex: '#303030' },
            { name: 'V0 VERT ROUSSEAU', hex: '#3C555A' },
            { name: '3Y CABAN', hex: '#2E3135' },
            { name: '46 EBENE', hex: '#453D3B' },
            { name: 'I7 BLEU ZELLIGE', hex: '#1C4CA4' },
            { name: '0L GRIS MEYER', hex: '#767877' },
            { name: '3I VERT CRIQUET', hex: '#91AA6B' },
            { name: '10 CRAIE', hex: '#F4E5D1' },
            { name: '80 GREIS PERLE', hex: '#9A9C97' },
            { name: '8F GRIS ETAIN', hex: '#565654' },
            { name: '21 NATUREL-SABLE', hex: '#9F8568' },
            { name: '2Z BLEU NUIT', hex: '#313B4B' },
            { name: '0G ROUGE SELLIER', hex: '#43342C' },
            { name: '73 BLEU SAPHIR', hex: '#3B4980' },
            { name: 'I2 NATA', hex: '#DDD4BF' },
            { name: '18 ETOUPE', hex: '#686054' },
            { name: '2H KRAFT', hex: '#977359' },
            { name: '36 BRIQUE', hex: '#A64B2E' },
            { name: '28 CARAMEL', hex: '#825D46' },
            { name: '55 ROUGE H', hex: '#792F27' },
            { name: 'S4 DEEP BLUE', hex: '#486886' },
            { name: '7U BLEU NAVY', hex: '#3C4E67' },
            { name: '71 BLEU FRANCE', hex: '#39568D' },
            { name: '3C PARCHEMIN', hex: '#DCD1BF' },
            { name: '3S COGNAC', hex: '#CC7A4A' },
            { name: '81 GRIS TOURTERELLE', hex: '#AA9B86' },
            { name: '6O VERT CYPRES', hex: '#415F6A' },
            { name: 'U1 VERT VERONE', hex: '#379593' },
            { name: '8U BLEU GLACIER', hex: '#A4ADAD' },
            { name: 'Y1 VANILLE', hex: '#E1CEA2' },
            { name: '6U VERT D\'EAU', hex: '#B2CDC1' },
            { name: '7N BLEU ELECTE', hex: '#68A4B9' },
            { name: 'O6 VERT ADE', hex: '#1B867D' }
        ],
        hardware: [
            { name: 'Palladium', hex: '#DADADA' },
            { name: 'Gold', hex: '#EADBB9' }
        ],
        linings: [
            { name: '80 GREIS PERLE', hex: '#9A9C97' },
            { name: '89 NOIR', hex: '#303030' },
            { name: '37 GOLD', hex: '#9D6E57' },
            { name: '9R LIME', hex: '#EDE54E' },
            { name: '73 BLEU SAPHIR', hex: '#3B4980' },
            { name: 'I2 NATA', hex: '#DDD4BF'},
            { name: '0D ROSE MEXICO', hex: '#B7385C'},
            { name: '76 BLEU INDIGO', hex: '#35404C' }
        ]
    }
};
// 定义材质颜色常量
const MATERIAL_COLORS = {
    palladium: new THREE.Color(0xDADADA),
    gold: new THREE.Color(0xEAD4A4)
};

// 创建基础材质
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),  // 修改为黑色
    roughness: 0.7,
    metalness: 0,
    normalMap: swiftNormalTexture  // 添加默认的法线贴图
});

const accentsMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#000000'),  
    roughness: 0.7,
    metalness: 0,
    normalMap: swiftNormalTexture  // 添加默认的法线贴图
});

const hardwareMaterial = new THREE.MeshStandardMaterial({
    color: MATERIAL_COLORS.palladium,
    roughness: 0.1,  // 降低粗糙度
    metalness: 1  // 提高金属度
});
const blackMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x303030),
    roughness: 0.8
});
const seamMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    roughness: 0.8
});

const ssssMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    roughness: 0.8
});

// 添加内衬状态管理
let currentLiningsMode = null;
let savedLiningsColor = null;

// 更新内衬材质函数
function updateLinings(mode, color) {
    if (mode === 'normal') {
        seamMaterial.color.copy(bodyMaterial.color);
        ssssMaterial.color.copy(accentsMaterial.color);
    } else if (mode === 'verso') {
        seamMaterial.color.copy(accentsMaterial.color);
        ssssMaterial.color.copy(bodyMaterial.color);
    } else if (color) {
        seamMaterial.color.setStyle(color);
        ssssMaterial.color.setStyle(color);
    }
    seamMaterial.needsUpdate = true;
    ssssMaterial.needsUpdate = true;
}
// 在场景定义之前添加canvas和camera的初始化
const canvas = document.querySelector(".webgl");
const container = document.querySelector(".canvas-container");

// 场景设置
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//camera
// 移除重复的相机定义
// const camera = new THREE.PerspectiveCamera( 50, canvas.clientWidth / canvas.clientHeight, 0.001, 1000 );
// camera.position.z = 1;
// camera.position.x = 0.1;
// camera.position.y = -0.4;
// camera.rotation.x = 3.14/2/90*20;
// camera.rotation.y = 3.14/2/90*6.5;
// scene.add(camera);

// 相机设置
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0.1, -0.4, 1); // 调整相机位置
camera.rotation.x = 3.14/2/90*20;
camera.rotation.y = 3.14/2/90*6.5;

//light
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.intensity = 220;
pointLight1.shadow = 0.5
pointLight1.position.set(2,6,4);
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.intensity = 100;
pointLight2.position.set(0,-13,0.4);
scene.add(pointLight2);
const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.intensity = 100;
pointLight3.position.set(5,0.1,-4);
scene.add(pointLight3);
const pointLight4 = new THREE.PointLight(0xffffff);
pointLight4.intensity = 100;
pointLight4.position.set(-4,-0.6,4);
scene.add(pointLight4);
const pointLight5 = new THREE.PointLight(0xffffff);
pointLight5.intensity = 100;
pointLight5.position.set(-5,0.1,-7); 
scene.add(pointLight5);


// 渲染器设置
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

// 控制器设置
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 0.5;
controls.maxDistance = 10;
// 移除重复的代码
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
// 添加画布尺寸调整函数
function onCanvasResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// 添加resize事件监听
window.addEventListener('resize', onCanvasResize);

// 修改动画函数确保持续渲染：
// 添加浮动动画参数
let floatingTime = 0;
const floatingSpeed = 0.005;
const floatingHeight = 0.03;

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // 只对模型的根节点应用浮动效果
    scene.children.forEach((child) => {
        if (child.type === 'Group' || child.type === 'Object3D') {
            floatingTime += floatingSpeed;
            child.position.y = Math.sin(floatingTime) * floatingHeight;
        }
    });

    renderer.render(scene, camera);
}
// 确保在加载完成后开始动画
// 初始化事件监听器
function initializeEventListeners() {
    // 模型选择按钮事件
    document.querySelectorAll('.model-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const modelType = e.target.dataset.model;
            document.querySelectorAll('.model-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            loadModel(modelType);
        });
    });

    // 材质选择按钮事件
    document.querySelectorAll('.material-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('disabled')) return;
            const materialType = e.target.dataset.material;
            document.querySelectorAll('.material-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            updateMaterial(materialType);   
        });
    });

    // 更新材质按钮状态的函数
    function updateMaterialButtons(modelType) {
        const availableMaterials = CONFIG.models[modelType].availableMaterials;
        document.querySelectorAll('.material-btn').forEach(button => {
            const materialType = button.dataset.material;
            if (availableMaterials.includes(materialType)) {
                button.classList.remove('disabled');
                button.disabled = false;
            } else {
                button.classList.add('disabled');
                button.disabled = true;
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                }
            }
        });
    }

    // 颜色选择器事件
    document.querySelectorAll('.color-picker').forEach(picker => {
        const colorType = picker.dataset.color;
        if (!CONFIG.colors[colorType]) return;

        const preview = picker.querySelector('.color-preview');
        // 设置初始颜色
        let initialColor;
        switch(colorType) {
            case 'body':
                initialColor = '#303030';
                break;
            case 'accent':
                initialColor = '#303030';
                break;
            case 'hardware':
                initialColor = '#DADADA';
                break;
            case 'linings':
                initialColor = '#DDD4BF';
                break;
            default:
                initialColor = CONFIG.colors[colorType][0].hex;
        }
        preview.style.backgroundColor = initialColor;
        if (colorType === 'linings') {
            savedLiningsColor = initialColor;
            updateLinings(null, initialColor);
        } else {
            updateColor(colorType, initialColor);
        }

        const palette = document.createElement('div');
        palette.className = 'color-palette';

        // 创建颜色选项
        const activeButton = document.querySelector('.material-btn.active');
        const materialType = activeButton ? activeButton.dataset.material : null;
        const materialConfig = materialType ? CONFIG.materials[materialType] : null;

        const availableColors = (materialConfig && materialConfig.availableColors && materialConfig.availableColors[colorType]) || CONFIG.colors[colorType].map(c => c.name);
        // 如果没有可用颜色配置，使用默认颜色列表
        console.log('Available colors for', colorType, ':', availableColors);
        CONFIG.colors[colorType].forEach(color => {
            if (availableColors.includes(color.name)) {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color.hex;
                swatch.title = color.name;
                swatch.addEventListener('click', () => {
                    preview.style.backgroundColor = color.hex;
                    if (colorType === 'linings') {
                        if (!currentLiningsMode) {
                            savedLiningsColor = color.hex;
                            updateLinings(null, color.hex);
                        }
                    } else {
                        updateColor(colorType, color.hex);
                    }
                    palette.style.display = 'none';
                });
                palette.appendChild(swatch);
            }
        });

        picker.appendChild(palette);
        preview.addEventListener('click', () => {
            if (colorType === 'linings' && currentLiningsMode) return;
            
            // 获取当前激活的材质和配置
            const activeButton = document.querySelector('.material-btn.active');
            const materialType = activeButton ? activeButton.dataset.material : null;
            const materialConfig = materialType ? CONFIG.materials[materialType] : null;
            
            // 更新可用颜色
            const availableColors = materialConfig && materialConfig.availableColors && materialConfig.availableColors[colorType]
                ? materialConfig.availableColors[colorType]
                : CONFIG.colors[colorType].map(c => c.name);
            
            // 清空并重新填充调色板
            palette.innerHTML = '';
            CONFIG.colors[colorType].forEach(color => {
                if (availableColors.includes(color.name)) {
                    const swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = color.hex;
                    swatch.title = color.name;
                    swatch.addEventListener('click', () => {
                        preview.style.backgroundColor = color.hex;
                        if (colorType === 'linings') {
                            if (!currentLiningsMode) {
                                savedLiningsColor = color.hex;
                                updateLinings(null, color.hex);
                            }
                        } else {
                            updateColor(colorType, color.hex);
                        }
                        palette.style.display = 'none';
                    });
                    palette.appendChild(swatch);
                }
            });
            
            const allPalettes = document.querySelectorAll('.color-palette');
            allPalettes.forEach(p => p.style.display = 'none');
            palette.style.display = 'grid';
        });
    });

    // 点击其他区域关闭颜色选择器
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.color-picker')) {
            document.querySelectorAll('.color-palette').forEach(palette => {
                palette.style.display = 'none';
            });
        }
    });

    // 内衬复选框事件
    document.querySelectorAll('.linings-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const mode = e.target.dataset.mode;
            const otherCheckbox = document.querySelector(`.linings-checkbox[data-mode="${mode === 'normal' ? 'verso' : 'normal'}"]`);
            const liningsColorPicker = document.querySelector('.color-picker[data-color="linings"]').parentElement;

            if (e.target.checked) {
                currentLiningsMode = mode;
                otherCheckbox.checked = false;
                liningsColorPicker.classList.add('disabled');
                updateLinings(mode);
            } else {
                currentLiningsMode = null;
                liningsColorPicker.classList.remove('disabled');
                if (savedLiningsColor) {
                    updateLinings(null, savedLiningsColor);
                }
            }
        });
    });

const loadingElement = document.createElement('div');
loadingElement.className = 'loading-screen';
loadingElement.innerHTML = `
    <div class="loading-progress">
        <div class="progress-bar"></div>
        <div class="progress-text">Loading... 0%</div>
    </div>
`;
document.body.appendChild(loadingElement);

// 设置加载管理器回调
loadingManager.onProgress = (url, loaded, total) => {
    const progress = (loaded / total) * 100;
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressText) progressText.textContent = `Loading... ${Math.round(progress)}%`;
};

loadingManager.onLoad = () => {
    loadingElement.style.display = 'none';
};

    // 捐赠按钮事件
    const donateBtn = document.querySelector('.donate-btn');
    const qrPanel = document.createElement('div');
    qrPanel.className = 'qr-panel';
    qrPanel.innerHTML = `
        <div class="qr-container">
            <div class="qr-code">
                <img src="/static/wechat-qr.jpg" alt="WeChat QR Code">
                <p>WeChat</p>
            </div>
            <div class="qr-code">
                <img src="/static/alipay-qr.jpg" alt="Alipay QR Code">
                <p>Alipay</p>
            </div>
        </div>
    `;
    donateBtn.parentElement.appendChild(qrPanel);

    donateBtn.addEventListener('click', () => {
        qrPanel.classList.toggle('active');
    });

    // 点击其他区域关闭二维码面板
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.donate-section')) {
            qrPanel.classList.remove('active');
        }
    });
}

// 更新材质函数
function updateMaterial(materialType) {
    const materialConfig = CONFIG.materials[materialType];
    if (!materialConfig) return;

    const normalMap = textureLoader.load(materialConfig.normalMap);
    normalMap.flipY = false;
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    // 为特定材质设置不同的缩放
    if (materialType === 'ostrich') {
        normalMap.repeat.set(1.5, 1.5); // 增加 ostrich 材质的重复次数
        [bodyMaterial, accentsMaterial].forEach(material => {
            material.normalMap = normalMap;
            material.roughness = materialConfig.roughness;
            material.normalScale.set(0.4, 0.4); // 减小 ostrich 材质的法线强度
            material.needsUpdate = true;
        });
    } else if (materialType === 'togo') {
            normalMap.repeat.set(2.5, 2.5); // 增加 ostrich 材质的重复次数
            [bodyMaterial, accentsMaterial].forEach(material => {
                material.normalMap = normalMap;
                material.roughness = materialConfig.roughness;
                material.normalScale.set(0.5, 0.5); // 减小 ostrich 材质的法线强度
                material.needsUpdate = true;
            });   
     } else if (materialType === 'epsom') {
            normalMap.repeat.set(1.7, 1.7); // 增加 ostrich 材质的重复次数
            [bodyMaterial, accentsMaterial].forEach(material => {
                material.normalMap = normalMap;
                material.roughness = materialConfig.roughness;
                material.normalScale.set(6, 6); // 减小 ostrich 材质的法线强度
                material.needsUpdate = true;
            });  
     } else if (materialType === 'chevre') {
            normalMap.repeat.set(2, 2); // 增加 ostrich 材质的重复次数
            [bodyMaterial, accentsMaterial].forEach(material => {
                material.normalMap = normalMap;
                material.roughness = materialConfig.roughness;
                material.normalScale.set(0.8, 0.8); // 减小 ostrich 材质的法线强度
                material.needsUpdate = true;
            });  
    } else if (materialType === 'alligator') {
            normalMap.repeat.set(0.7, 0.7); // 增加 ostrich 材质的重复次数
            [bodyMaterial, accentsMaterial].forEach(material => {
                material.normalMap = normalMap;
                material.roughness = materialConfig.roughness;
                material.normalScale.set(0.6, 0.6); // 减小 ostrich 材质的法线强度
                material.needsUpdate = true;
            });  
    } else {
        // 其他材质保持原样
        [bodyMaterial, accentsMaterial].forEach(material => {
            material.normalMap = normalMap;
            material.roughness = materialConfig.roughness;
            material.normalScale.set(1, 1);
            material.needsUpdate = true;
        });
    }

    // 重新加载当前模型以确保材质更新
    const currentModel = scene.children.find(child => child.type === 'Group' || child.type === 'Object3D');
    if (currentModel) {
        const modelType = currentModel.userData.modelType;
        loadModel(modelType);
    }
}

// 更新颜色函数
function updateColor(colorType, hexColor) {
    switch(colorType) {
        case 'body':
            bodyMaterial.color.setStyle(hexColor);
            bodyMaterial.needsUpdate = true;
            break;
        case 'accent':
            accentsMaterial.color.setStyle(hexColor);
            accentsMaterial.needsUpdate = true;
            break;
        case 'hardware':
            hardwareMaterial.color.setStyle(hexColor);
            hardwareMaterial.needsUpdate = true;
            break;
    }

    // 重新加载当前模型以确保颜色更新
    const currentModel = scene.children.find(child => child.type === 'Group' || child.type === 'Object3D');
    if (currentModel) {
        const modelType = currentModel.userData.modelType;
        loadModel(modelType);
    }
}

// 添加loadModel函数
function loadModel(modelType) {
    // 更新材质按钮状态
    const availableMaterials = CONFIG.models[modelType].availableMaterials;
    document.querySelectorAll('.material-btn').forEach(button => {
        const materialType = button.dataset.material;
        if (availableMaterials.includes(materialType)) {
            button.classList.remove('disabled');
            button.disabled = false;
        } else {
            button.classList.add('disabled');
            button.disabled = true;
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            }
        }
    });

    // 加载新模型
    loader.load(CONFIG.models[modelType].path, (gltf) => {
        // 移除当前模型（如果存在）
        scene.children.forEach((child) => {
            if (child.type === 'Group' || child.type === 'Object3D') {
                scene.remove(child);
            }
        });

        // 添加新模型
        const model = gltf.scene;
        model.scale.set(
            CONFIG.models[modelType].scale,
            CONFIG.models[modelType].scale,
            CONFIG.models[modelType].scale
        );

            // 应用材质
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    // 获取原始材质名称
                    const originalMaterialName = child.material.name?.toUpperCase() || '';
                    
                    // 根据材质名称应用对应的材质
                    if (originalMaterialName.includes('BODY')) {
                        child.material = bodyMaterial;
                    } else if (originalMaterialName.includes('ACCENTS')) {
                        child.material = accentsMaterial;
                    } else if (originalMaterialName.includes('HARDWARE')) {
                        child.material = hardwareMaterial;
                    } else if (originalMaterialName.includes('SEAM')) {
                        child.material = seamMaterial;
                    } else if (originalMaterialName.includes('SSSS')) {
                        child.material = ssssMaterial;
                    } else if (originalMaterialName.includes('BLACK')) {
                        child.material = blackMaterial;
                    }
                }
            });

        scene.add(model);

        // 选择第一个可用材质
        const firstAvailableMaterial = availableMaterials[0];
        if (firstAvailableMaterial) {
            const materialButton = document.querySelector(`.material-btn[data-material="${firstAvailableMaterial}"]`);
            if (materialButton) {
                materialButton.click();
            }
        }
    });
}


window.addEventListener('load', () => {
    initializeEventListeners();
    // 设置初始按钮状态
    document.querySelector('[data-model="birkin"]').classList.add('active');
    document.querySelector('[data-material="swift"]').classList.add('active');
    loadModel('birkin');
    onCanvasResize(); // 初始化时调用
    animate(); // 启动动画循环
});
