import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CONFIG } from './config.js';

export class ModelManager {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.currentModel = null;
        this.materials = new Map();
        this.initializeMaterials();
    }

    async loadModel(modelKey) {
        const modelConfig = CONFIG.models[modelKey];
        if (!modelConfig) return;

        // 移除当前模型
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
        }

        try {
            const gltf = await this.loader.loadAsync(modelConfig.path);
            this.currentModel = gltf.scene;
            this.currentModel.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);
            this.scene.add(this.currentModel);
            this.applyCurrentMaterials();
        } catch (error) {
            console.error('模型加载失败:', error);
        }
    }

    initializeMaterials() {
        // 创建基础材质
        const bodyMaterial = new THREE.MeshStandardMaterial();
        const accentsMaterial = new THREE.MeshStandardMaterial();
        const hardwareMaterial = new THREE.MeshStandardMaterial();

        this.materials.set('body', bodyMaterial);
        this.materials.set('accent', accentsMaterial);
        this.materials.set('hardware', hardwareMaterial);
    }

    updateMaterialColor(part, color) {
        const material = this.materials.get(part);
        if (material) {
            material.color.set(color);
        }
    }

    updateMaterialTexture(materialType) {
        const materialConfig = CONFIG.materials[materialType];
        if (!materialConfig) return;

        const textureLoader = new THREE.TextureLoader();
        const normalMap = textureLoader.load(materialConfig.normalMap);
        const roughnessMap = textureLoader.load(materialConfig.roughnessMap);

        ['body', 'accent'].forEach(part => {
            const material = this.materials.get(part);
            if (material) {
                material.normalMap = normalMap;
                material.roughnessMap = roughnessMap;
            }
        });
    }

    applyCurrentMaterials() {
        if (!this.currentModel) return;

        this.currentModel.traverse(child => {
            if (child.isMesh) {
                if (child.name.includes('BODY')) {
                    child.material = this.materials.get('body');
                } else if (child.name.includes('ACCENTS')) {
                    child.material = this.materials.get('accent');
                } else if (child.name.includes('HARDWARE')) {
                    child.material = this.materials.get('hardware');
                }
            }
        });
    }
}