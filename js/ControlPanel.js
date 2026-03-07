import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js';

export default class ControlPanel {
    constructor() {
        this.panel = document.querySelector('#control-panel');
        this.header = document.querySelector('#panel-header');
        this.panelContent = document.querySelector('.panel-content');

        this.PARAMS = {
            speedMultiplier: 1.0
        };
        this.initTweakpane();

        this.isDragging = false;
        this.baseX = 0;
        this.baseY = 0;
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;
        this.originOffsetX = 0;
        this.originOffsetY = 0;

        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;

        this.calculateBoundaries();
        this.initDragListeners();

        window.addEventListener('resize', () => this.calculateBoundaries());
    }

    initTweakpane() {
        this.panelContent.innerHTML = '';

        this.pane = new Pane({
            container: this.panelContent,
        });

        this.pane.addBinding(this.PARAMS, 'speedMultiplier', {
            min: 0,
            max: 5,
            step: 0.1,
            label: 'Speed (Avg)'
        });
    }

    get settings() {
        return this.PARAMS;
    }

    initDragListeners() {
        this.header.addEventListener('mousedown', this.dragStart.bind(this));
        window.addEventListener('mousemove', this.drag.bind(this));
        window.addEventListener('mouseup', this.dragEnd.bind(this));
    }

    dragStart(e) {
        this.baseX = e.clientX - this.originOffsetX;
        this.baseY = e.clientY - this.originOffsetY;

        if (e.target === this.header) {
            this.isDragging = true;
        }
    }

    drag(e) {
        if (this.isDragging) {
            e.preventDefault();

            this.mouseOffsetX = e.clientX - this.baseX;
            this.mouseOffsetY = e.clientY - this.baseY;

            this.originOffsetX = this.mouseOffsetX;
            this.originOffsetY = this.mouseOffsetY;

            const clampedX = Math.min(this.maxX, Math.max(this.minX, this.mouseOffsetX));
            const clampedY = Math.min(this.maxY, Math.max(this.minY, this.mouseOffsetY));

            this.placePanel(clampedX, clampedY);
        }
    }

    dragEnd() {
        this.isDragging = false;
    }

    placePanel(x, y) {
        this.panel.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    calculateBoundaries() {
        this.maxX = window.innerWidth - this.panel.offsetWidth - this.panel.offsetLeft;
        this.minX = -this.panel.offsetLeft;
        this.maxY = window.innerHeight - this.panel.offsetHeight - this.panel.offsetTop;
        this.minY = -this.panel.offsetTop;
    }
}