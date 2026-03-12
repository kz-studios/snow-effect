import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js';

export default class ControlPanel {
    constructor() {
        this.panel = document.querySelector('#control-panel');
        this.header = document.querySelector('#panel-header');
        this.panelContent = document.querySelector('.panel-content');

        this.PARAMS = {
            snowflakeAsset: 'circle',
            sizeAvg: 5,
            speedMultiplier: 1.0,
            driftAngle: 0
        };
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        this.isMobile = mediaQuery.matches;

        mediaQuery.addEventListener('change', (event) => {
            this.isMobile = event.matches; 
        });

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

        this.resizeTimer = null;

        // Put the control panel back to its relative position during window resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.panel.style.transform = '';
                this.isDragging = false;
                this.baseX = 0;
                this.baseY = 0;
                this.mouseOffsetX = 0;
                this.mouseOffsetY = 0;
                this.originOffsetX = 0;
                this.originOffsetY = 0;
                this.calculateBoundaries();
            }, 500);
        });
    }

    initTweakpane() {
        this.pane = new Pane({
            container: this.panelContent,
        });

        const assetBinding = this.pane.addBinding(this.PARAMS, 'snowflakeAsset', {
            label: 'Snowflake Asset',
            options: {
                'Circle (default)': 'circle',
                'Snowflake': 'snowflake',
            }
        });

        assetBinding.on('change', (ev) => {
            const event = new CustomEvent('assetChanged', {
                detail: { asset: ev.value } 
            });
            window.dispatchEvent(event);
        });

        this.pane.addBinding(this.PARAMS, 'sizeAvg', {
            min: 1,
            max: 50,
            step: 1,
            label: 'Size (Avg)'
        })

        this.pane.addBinding(this.PARAMS, 'speedMultiplier', {
            min: 0,
            max: 5,
            step: 0.1,
            label: 'Speed (Avg)'
        });

        this.pane.addBinding(this.PARAMS, 'driftAngle', {
            min: -75,
            max: 75,
            step: 1,
            label: 'Drift Angle'
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
        if (this.isMobile) return;

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