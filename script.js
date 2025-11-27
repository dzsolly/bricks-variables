// Initialize color counter for unique IDs
let colorCounter = 3;

// Get all input elements
const inputs = {
    // Typography with clamp
    fontBaseMin: document.getElementById('font-base-min'),
    fontBasePref: document.getElementById('font-base-pref'),
    fontBaseMax: document.getElementById('font-base-max'),
    fontH1Min: document.getElementById('font-h1-min'),
    fontH1Pref: document.getElementById('font-h1-pref'),
    fontH1Max: document.getElementById('font-h1-max'),
    fontH2Min: document.getElementById('font-h2-min'),
    fontH2Pref: document.getElementById('font-h2-pref'),
    fontH2Max: document.getElementById('font-h2-max'),
    fontH3Min: document.getElementById('font-h3-min'),
    fontH3Pref: document.getElementById('font-h3-pref'),
    fontH3Max: document.getElementById('font-h3-max'),
    lineHeight: document.getElementById('line-height'),
    
    // Font weights
    fontWeightLight: document.getElementById('font-weight-light'),
    fontWeightRegular: document.getElementById('font-weight-regular'),
    fontWeightMedium: document.getElementById('font-weight-medium'),
    fontWeightSemibold: document.getElementById('font-weight-semibold'),
    fontWeightBold: document.getElementById('font-weight-bold'),
    
    // Spacing
    gapXs: document.getElementById('gap-xs'),
    gapSmall: document.getElementById('gap-small'),
    gapMedium: document.getElementById('gap-medium'),
    gapLarge: document.getElementById('gap-large'),
    gapXl: document.getElementById('gap-xl'),
    sectionSpacing: document.getElementById('section-spacing'),
    containerPadding: document.getElementById('container-padding'),
    
    // Grid
    gridColumns: document.getElementById('grid-columns'),
    gridGap: document.getElementById('grid-gap'),
    containerWidth: document.getElementById('container-width'),
    
    // Border & Radius
    borderThin: document.getElementById('border-thin'),
    borderMedium: document.getElementById('border-medium'),
    borderThick: document.getElementById('border-thick'),
    radiusNone: document.getElementById('radius-none'),
    radiusSmall: document.getElementById('radius-small'),
    radiusMedium: document.getElementById('radius-medium'),
    radiusLarge: document.getElementById('radius-large'),
    radiusFull: document.getElementById('radius-full'),
    
    // Shadows
    shadowSmall: document.getElementById('shadow-small'),
    shadowMedium: document.getElementById('shadow-medium'),
    shadowLarge: document.getElementById('shadow-large'),
    shadowXl: document.getElementById('shadow-xl'),
    
    // Transitions
    durationFast: document.getElementById('duration-fast'),
    durationNormal: document.getElementById('duration-normal'),
    durationSlow: document.getElementById('duration-slow'),
    easing: document.getElementById('easing'),
    
    // Breakpoints
    bpMobile: document.getElementById('bp-mobile'),
    bpTablet: document.getElementById('bp-tablet'),
    bpDesktop: document.getElementById('bp-desktop'),
    bpWide: document.getElementById('bp-wide'),
    bpUltra: document.getElementById('bp-ultra'),
    
    // Z-Index
    zDropdown: document.getElementById('z-dropdown'),
    zSticky: document.getElementById('z-sticky'),
    zFixed: document.getElementById('z-fixed'),
    zBackdrop: document.getElementById('z-backdrop'),
    zModal: document.getElementById('z-modal'),
    zPopover: document.getElementById('z-popover'),
    zTooltip: document.getElementById('z-tooltip'),
    
    // Opacity
    opacityDisabled: document.getElementById('opacity-disabled'),
    opacitySubtle: document.getElementById('opacity-subtle'),
    opacityHover: document.getElementById('opacity-hover'),
    opacityActive: document.getElementById('opacity-active'),
    
    // Button & Form
    btnHeightSm: document.getElementById('btn-height-sm'),
    btnHeightMd: document.getElementById('btn-height-md'),
    btnHeightLg: document.getElementById('btn-height-lg'),
    btnPaddingX: document.getElementById('btn-padding-x'),
    inputHeight: document.getElementById('input-height'),
    inputPadding: document.getElementById('input-padding'),
    focusRingWidth: document.getElementById('focus-ring-width'),
    
    // Icon Sizes
    iconSm: document.getElementById('icon-sm'),
    iconMd: document.getElementById('icon-md'),
    iconLg: document.getElementById('icon-lg'),
    iconXl: document.getElementById('icon-xl')
};

// Update preview on any input change
Object.values(inputs).forEach(input => {
    if (input) {
        input.addEventListener('input', updatePreview);
    }
});

// Color inputs handling
function setupColorInputs() {
    // Primary colors
    const colorInputs = document.querySelectorAll('.color-input');
    const colorHexes = document.querySelectorAll('.color-hex');

    colorInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            colorHexes[index].value = e.target.value;
            updatePreview();
        });
    });

    colorHexes.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                colorInputs[index].value = hex;
                updatePreview();
            }
        });
    });

    // Status colors
    const statusColorInputs = document.querySelectorAll('.status-color-input');
    const statusColorHexes = document.querySelectorAll('.status-color-hex');

    statusColorInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            statusColorHexes[index].value = e.target.value;
        });
    });

    statusColorHexes.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                statusColorInputs[index].value = hex;
            }
        });
    });

    // Neutral colors
    const neutralColorInputs = document.querySelectorAll('.neutral-color-input');
    const neutralColorHexes = document.querySelectorAll('.neutral-color-hex');

    neutralColorInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            neutralColorHexes[index].value = e.target.value;
        });
    });

    neutralColorHexes.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                neutralColorInputs[index].value = hex;
            }
        });
    });
}

setupColorInputs();

// Add new color
document.getElementById('add-color').addEventListener('click', () => {
    const container = document.getElementById('colors-container');
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    colorItem.setAttribute('data-color-name', `Custom-${colorCounter}`);
    colorItem.innerHTML = `
        <label>Custom ${colorCounter}:</label>
        <input type="color" class="color-input" value="#64748b">
        <input type="text" class="color-hex" value="#64748b">
        <button class="btn-remove" onclick="this.parentElement.remove(); updatePreview();">❌</button>
    `;
    container.appendChild(colorItem);
    colorCounter++;
    setupColorInputs();
    updatePreview();
});

// Update preview
function updatePreview() {
    const preview = document.querySelector('.preview-content');
    const grid = document.querySelector('.preview-grid');
    
    // Apply typography with clamp
    const h1Clamp = `clamp(${inputs.fontH1Min.value}px, ${inputs.fontH1Pref.value}vw, ${inputs.fontH1Max.value}px)`;
    const h2Clamp = `clamp(${inputs.fontH2Min.value}px, ${inputs.fontH2Pref.value}vw, ${inputs.fontH2Max.value}px)`;
    const h3Clamp = `clamp(${inputs.fontH3Min.value}px, ${inputs.fontH3Pref.value}vw, ${inputs.fontH3Max.value}px)`;
    const baseClamp = `clamp(${inputs.fontBaseMin.value}px, ${inputs.fontBasePref.value}vw, ${inputs.fontBaseMax.value}px)`;
    
    preview.querySelector('h1').style.fontSize = h1Clamp;
    preview.querySelector('h2').style.fontSize = h2Clamp;
    preview.querySelector('h3').style.fontSize = h3Clamp;
    preview.querySelector('p').style.fontSize = baseClamp;
    preview.querySelector('p').style.lineHeight = inputs.lineHeight.value;
    
    // Apply grid
    grid.style.gridTemplateColumns = `repeat(${inputs.gridColumns.value}, 1fr)`;
    grid.style.gap = inputs.gridGap.value + 'px';
    
    // Apply border radius to grid items
    const gridItems = grid.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.borderRadius = inputs.radiusMedium.value + 'px';
        item.style.boxShadow = inputs.shadowMedium.value;
    });
    
    // Apply colors to grid items
    const colorInputs = document.querySelectorAll('.color-input');
    gridItems.forEach((item, index) => {
        if (colorInputs[index]) {
            item.style.background = colorInputs[index].value;
        }
    });
    
    // Apply button styles
    const previewBtn = document.querySelector('.preview-btn');
    if (previewBtn) {
        previewBtn.style.height = inputs.btnHeightMd.value + 'px';
        previewBtn.style.paddingLeft = inputs.btnPaddingX.value + 'px';
        previewBtn.style.paddingRight = inputs.btnPaddingX.value + 'px';
        previewBtn.style.borderRadius = inputs.radiusMedium.value + 'px';
        previewBtn.style.transition = `all ${inputs.durationNormal.value}ms ${inputs.easing.value}`;
    }
}

// Generate JSON data
function generateJSON() {
    // Primary colors
    const colors = {};
    const colorItems = document.querySelectorAll('#colors-container .color-item');
    
    colorItems.forEach(item => {
        const label = item.querySelector('label').textContent.replace(':', '').trim();
        const hex = item.querySelector('.color-hex').value;
        const key = label.toLowerCase().replace(/\s+/g, '-');
        colors[key] = hex;
    });

    // Status colors
    const statusColors = {
        success: document.getElementById('color-success').nextElementSibling.value,
        warning: document.getElementById('color-warning').nextElementSibling.value,
        error: document.getElementById('color-error').nextElementSibling.value,
        info: document.getElementById('color-info').nextElementSibling.value
    };

    // Neutral colors
    const neutralColors = {
        backgroundLight: document.getElementById('color-bg-light').nextElementSibling.value,
        backgroundDark: document.getElementById('color-bg-dark').nextElementSibling.value,
        textPrimary: document.getElementById('color-text-primary').nextElementSibling.value,
        textSecondary: document.getElementById('color-text-secondary').nextElementSibling.value,
        border: document.getElementById('color-border').nextElementSibling.value
    };

    const data = {
        typography: {
            fontSizes: {
                base: `clamp(${inputs.fontBaseMin.value}px, ${inputs.fontBasePref.value}vw, ${inputs.fontBaseMax.value}px)`,
                h1: `clamp(${inputs.fontH1Min.value}px, ${inputs.fontH1Pref.value}vw, ${inputs.fontH1Max.value}px)`,
                h2: `clamp(${inputs.fontH2Min.value}px, ${inputs.fontH2Pref.value}vw, ${inputs.fontH2Max.value}px)`,
                h3: `clamp(${inputs.fontH3Min.value}px, ${inputs.fontH3Pref.value}vw, ${inputs.fontH3Max.value}px)`
            },
            fontWeights: {
                light: inputs.fontWeightLight.value,
                regular: inputs.fontWeightRegular.value,
                medium: inputs.fontWeightMedium.value,
                semibold: inputs.fontWeightSemibold.value,
                bold: inputs.fontWeightBold.value
            },
            lineHeight: inputs.lineHeight.value
        },
        spacing: {
            gapXs: inputs.gapXs.value + 'px',
            gapSmall: inputs.gapSmall.value + 'px',
            gapMedium: inputs.gapMedium.value + 'px',
            gapLarge: inputs.gapLarge.value + 'px',
            gapXl: inputs.gapXl.value + 'px',
            sectionSpacing: inputs.sectionSpacing.value + 'px',
            containerPadding: inputs.containerPadding.value + 'px'
        },
        grid: {
            columns: parseInt(inputs.gridColumns.value),
            gap: inputs.gridGap.value + 'px',
            containerMaxWidth: inputs.containerWidth.value + 'px'
        },
        borders: {
            widths: {
                thin: inputs.borderThin.value + 'px',
                medium: inputs.borderMedium.value + 'px',
                thick: inputs.borderThick.value + 'px'
            },
            radius: {
                none: inputs.radiusNone.value + 'px',
                small: inputs.radiusSmall.value + 'px',
                medium: inputs.radiusMedium.value + 'px',
                large: inputs.radiusLarge.value + 'px',
                full: inputs.radiusFull.value + 'px'
            }
        },
        shadows: {
            small: inputs.shadowSmall.value,
            medium: inputs.shadowMedium.value,
            large: inputs.shadowLarge.value,
            xl: inputs.shadowXl.value
        },
        transitions: {
            duration: {
                fast: inputs.durationFast.value + 'ms',
                normal: inputs.durationNormal.value + 'ms',
                slow: inputs.durationSlow.value + 'ms'
            },
            easing: inputs.easing.value
        },
        breakpoints: {
            mobile: inputs.bpMobile.value + 'px',
            tablet: inputs.bpTablet.value + 'px',
            desktop: inputs.bpDesktop.value + 'px',
            wide: inputs.bpWide.value + 'px',
            ultraWide: inputs.bpUltra.value + 'px'
        },
        zIndex: {
            dropdown: inputs.zDropdown.value,
            sticky: inputs.zSticky.value,
            fixed: inputs.zFixed.value,
            modalBackdrop: inputs.zBackdrop.value,
            modal: inputs.zModal.value,
            popover: inputs.zPopover.value,
            tooltip: inputs.zTooltip.value
        },
        opacity: {
            disabled: inputs.opacityDisabled.value,
            subtle: inputs.opacitySubtle.value,
            hover: inputs.opacityHover.value,
            active: inputs.opacityActive.value
        },
        buttons: {
            heights: {
                small: inputs.btnHeightSm.value + 'px',
                medium: inputs.btnHeightMd.value + 'px',
                large: inputs.btnHeightLg.value + 'px'
            },
            paddingX: inputs.btnPaddingX.value + 'px'
        },
        forms: {
            inputHeight: inputs.inputHeight.value + 'px',
            inputPadding: inputs.inputPadding.value + 'px',
            focusRingWidth: inputs.focusRingWidth.value + 'px'
        },
        icons: {
            small: inputs.iconSm.value + 'px',
            medium: inputs.iconMd.value + 'px',
            large: inputs.iconLg.value + 'px',
            xl: inputs.iconXl.value + 'px'
        },
        colors: {
            primary: colors,
            status: statusColors,
            neutral: neutralColors
        }
    };

    return data;
}

// Generate CSS variables
function generateCSS() {
    const data = generateJSON();
    let css = ':root {\n';
    
    // Typography
    css += '  /* Typography - Fluid Font Sizes with clamp() */\n';
    css += `  --font-base: ${data.typography.fontSizes.base};\n`;
    css += `  --font-h1: ${data.typography.fontSizes.h1};\n`;
    css += `  --font-h2: ${data.typography.fontSizes.h2};\n`;
    css += `  --font-h3: ${data.typography.fontSizes.h3};\n`;
    css += `  --line-height: ${data.typography.lineHeight};\n\n`;
    
    // Font Weights
    css += '  /* Font Weights */\n';
    Object.entries(data.typography.fontWeights).forEach(([key, value]) => {
        css += `  --font-weight-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Spacing
    css += '  /* Spacing */\n';
    Object.entries(data.spacing).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    // Grid
    css += '  /* Grid */\n';
    css += `  --grid-columns: ${data.grid.columns};\n`;
    css += `  --grid-gap: ${data.grid.gap};\n`;
    css += `  --container-max-width: ${data.grid.containerMaxWidth};\n\n`;
    
    // Borders
    css += '  /* Border Widths */\n';
    Object.entries(data.borders.widths).forEach(([key, value]) => {
        css += `  --border-${key}: ${value};\n`;
    });
    css += '\n  /* Border Radius */\n';
    Object.entries(data.borders.radius).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Shadows
    css += '  /* Shadows */\n';
    Object.entries(data.shadows).forEach(([key, value]) => {
        css += `  --shadow-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Transitions
    css += '  /* Transitions */\n';
    Object.entries(data.transitions.duration).forEach(([key, value]) => {
        css += `  --duration-${key}: ${value};\n`;
    });
    css += `  --easing: ${data.transitions.easing};\n\n`;
    
    // Breakpoints
    css += '  /* Breakpoints */\n';
    Object.entries(data.breakpoints).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --bp-${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    // Z-Index
    css += '  /* Z-Index Layers */\n';
    Object.entries(data.zIndex).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --z-${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    // Opacity
    css += '  /* Opacity */\n';
    Object.entries(data.opacity).forEach(([key, value]) => {
        css += `  --opacity-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Buttons
    css += '  /* Buttons */\n';
    Object.entries(data.buttons.heights).forEach(([key, value]) => {
        css += `  --btn-height-${key}: ${value};\n`;
    });
    css += `  --btn-padding-x: ${data.buttons.paddingX};\n\n`;
    
    // Forms
    css += '  /* Forms */\n';
    css += `  --input-height: ${data.forms.inputHeight};\n`;
    css += `  --input-padding: ${data.forms.inputPadding};\n`;
    css += `  --focus-ring-width: ${data.forms.focusRingWidth};\n\n`;
    
    // Icons
    css += '  /* Icons */\n';
    Object.entries(data.icons).forEach(([key, value]) => {
        css += `  --icon-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Primary Colors
    css += '  /* Primary Colors */\n';
    Object.entries(data.colors.primary).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Status Colors
    css += '  /* Status Colors */\n';
    Object.entries(data.colors.status).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
    });
    css += '\n';
    
    // Neutral Colors
    css += '  /* Neutral Colors */\n';
    Object.entries(data.colors.neutral).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --color-${cssKey}: ${value};\n`;
    });
    
    css += '}';
    return css;
}

// Download JSON
document.getElementById('download-json').addEventListener('click', () => {
    const data = generateJSON();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bricks-variables.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Download CSS
document.getElementById('download-css').addEventListener('click', () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bricks-variables.css';
    a.click();
    URL.revokeObjectURL(url);
});

// Copy JSON to clipboard
document.getElementById('copy-json').addEventListener('click', () => {
    const data = generateJSON();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
        const btn = document.getElementById('copy-json');
        const originalText = btn.textContent;
        btn.textContent = '✅ Másolva!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});

// Reset to defaults
document.getElementById('reset').addEventListener('click', () => {
    if (confirm('Biztosan visszaállítod az alapértelmezett értékeket?')) {
        location.reload();
    }
});

// Initial preview update
updatePreview();
