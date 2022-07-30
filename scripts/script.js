const colorBtn = document.getElementById('color');
const eraseBtn = document.getElementById('erase');
const fillBtn = document.getElementById('fill');
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');

const usualColorBtn = document.getElementById('usual-color');
const randomColorBtn = document.getElementById('random-color');
const toggleGridBtn = document.getElementById('toggle-grid');

const colorDropdown = document.querySelector('.color-options');
const eraseDropdown = document.querySelector('.erase-options');
const resizeDropdown = document.querySelector('.resize-options');

function displayDropdown(e){
    if (e.target === colorBtn){
        colorDropdown.classList.remove('no-display');
        colorBtn.classList.add('selected');
    } else {
        colorDropdown.classList.add('no-display');
        colorBtn.classList.remove('selected');
    }

    if (e.target === eraseBtn){
        eraseDropdown.classList.remove('no-display');
        eraseBtn.classList.add('selected');
    } else {
        eraseDropdown.classList.add('no-display');
        eraseBtn.classList.remove('selected');
    }

    if (e.target === resizeBtn){
        resizeDropdown.classList.remove('no-display');
        resizeBtn.classList.add('selected');
    } else {
        resizeDropdown.classList.add('no-display');
        resizeBtn.classList.remove('selected');
    }
}

document.addEventListener('click', displayDropdown);

function intRandomColor(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.addEventListener('dragenter', getRandomColor);
        block.addEventListener('mousedown', getRandomColor);
    })
}

function getRandomColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    this.style.cssText = `background-color: rgb(${r}, ${g}, ${b})`;
}

randomColorBtn.addEventListener('click', intRandomColor);

const canvas = document.getElementById('canvas');

function styleCanvasGrid(){
    canvas.style.cssText = `
    grid-template-columns: repeat(${canvasValue}, auto);
    grid-template-rows: repeat(${canvasValue}, auto);
    `
} 

const resizeSlider = document.getElementById('canvas-slider');
const resizeLabel = document.getElementById('canvas-size');

function changeResizeLabel(){
    resizeLabel.textContent =  `
    ${canvasValue} x ${canvasValue}
    `;
}

let canvasValue;
let crtCanvasSize;
let intCanvasSize;

function getCanvasSize(e){
    canvasValue = e.target.valueAsNumber;
    changeResizeLabel();
    styleCanvasGrid();
    intCanvasSize = canvasValue * canvasValue;
    if (crtCanvasSize !== intCanvasSize){
        while (crtCanvasSize > 0){
            const block = document.getElementById('block');
            canvas.removeChild(block);
            crtCanvasSize--;
        }
        crtCanvasSize = intCanvasSize;
        while (intCanvasSize > 0){
            const block = document.createElement('div');
            block.setAttribute('id', 'block');
            block.classList.add('block');
            canvas.appendChild(block);
            intCanvasSize--;
        }
    }
}

resizeSlider.addEventListener('input', getCanvasSize)

function toggleClassGrid(e){
    const blocks = document.querySelectorAll('#block');
    blocks.forEach((block) => {
        block.classList.toggle('grid');
    })
}

toggleGridBtn.addEventListener('click', toggleClassGrid)