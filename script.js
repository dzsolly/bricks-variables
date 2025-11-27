// Initialize
let colorCounter = 3;

// Get all inputs
const inputs = {
    // Typography (REM)
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
    
    // Spacing (REM)
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
    
    // Button & Form (REM)
    btnHeightSm: document.getElementById('btn-height-sm'),
    btnHeightMd: document.getElementById('btn-height-md'),
    btnHeightLg: document.getElementById('btn-height-lg'),
    btnPaddingX: document.getElementById('btn-padding-x'),
    inputHeight: document.getElementById('input-height'),
    inputPadding: document.getElementById('input-padding'),
    focusRingWidth: document.getElementById('focus-ring-width'),
    
    // Icon Sizes (REM)
    iconSm: document.getElementById('icon-sm'),
    iconMd: document.getElementById('icon-md'),
    iconLg: document.getElementById('icon-lg'),
    iconXl: document.getElementById('icon-xl')
};

// Update preview on input change
Object.values(inputs).forEach(input => {
    if (input) {
        input.addEventListener('input', updatePreview);
    }
});

// Color handling
function setupColorInputs() {
    const colorInputs = document.querySelectorAll('.color-input');
    const colorHexes = document.querySelectorAll('.color-hex');
    const statusColorInputs = document.querySelectorAll('.status-color-input');
    const statusColorHexes = document.querySelectorAll('.status-color-hex');
    const neutralColorInputs = document.querySelectorAll('.neutral-color-input');
    const neutralColorHexes = document.querySelectorAll('.neutral-color-hex');

    function syncColors(colorInputs, colorHexes) {
        colorInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (colorHexes[index]) {
                    colorHexes[index].value = e.target.value;
                    updatePreview();
                }
            });
        });

        colorHexes.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const hex = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(hex) && colorInputs[index]) {
                    colorInputs[index].value = hex;
                    updatePreview();
                }
            });
        });
    }

    syncColors(colorInputs, colorHexes);
    syncColors(statusColorInputs, statusColorHexes);
    syncColors(neutralColorInputs, neutralColorHexes);
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
    
    // Apply typography with clamp (REM)
    const h1Clamp = `clamp(${inputs.fontH1Min.value}rem, ${inputs.fontH1Pref.value}vw, ${inputs.fontH1Max.value}rem)`;
    const h2Clamp = `clamp(${inputs.fontH2Min.value}rem, ${inputs.fontH2Pref.value}vw, ${inputs.fontH2Max.value}rem)`;
    const h3Clamp = `clamp(${inputs.fontH3Min.value}rem, ${inputs.fontH3Pref.value}vw, ${inputs.fontH3Max.value}rem)`;
    const baseClamp = `clamp(${inputs.fontBaseMin.value}rem, ${inputs.fontBasePref.value}vw, ${inputs.fontBaseMax.value}rem)`;
    
    if (preview.querySelector('h1')) preview.querySelector('h1').style.fontSize = h1Clamp;
    if (preview.querySelector('h2')) preview.querySelector('h2').style.fontSize = h2Clamp;
    if (preview.querySelector('h3')) preview.querySelector('h3').style.fontSize = h3Clamp;
    if (preview.querySelector('p')) {
        preview.querySelector('p').style.fontSize = baseClamp;
        preview.querySelector('p').style.lineHeight = inputs.lineHeight.value;
    }
    
    // Apply grid
    if (grid) {
        grid.style.gridTemplateColumns = `repeat(${inputs.gridColumns.value}, 1fr)`;
        grid.style.gap = inputs.gridGap.value + 'rem';
        
        const gridItems = grid.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.style.borderRadius = inputs.radiusMedium.value + 'px';
            item.style.boxShadow = inputs.shadowMedium.value;
            
            const colorInputs = document.querySelectorAll('.color-input');
            if (colorInputs[index]) {
                item.style.background = colorInputs[index].value;
            }
        });
    }
    
    // Apply button styles
    const previewBtn = document.querySelector('.preview-btn');
    if (previewBtn) {
        previewBtn.style.height = inputs.btnHeightMd.value + 'rem';
        previewBtn.style.paddingLeft = inputs.btnPaddingX.value + 'rem';
        previewBtn.style.paddingRight = inputs.btnPaddingX.value + 'rem';
        previewBtn.style.borderRadius = inputs.radiusMedium.value + 'px';
        previewBtn.style.transition = `all ${inputs.durationNormal.value}ms ${inputs.easing.value}`;
    }
}

// Generate JSON
function generateJSON() {
    const colors = {};
    const colorItems = document.querySelectorAll('#colors-container .color-item');
    
    colorItems.forEach(item => {
        const label = item.querySelector('label').textContent.replace(':', '').trim();
        const hex = item.querySelector('.color-hex').value;
        const key = label.toLowerCase().replace(/\s+/g, '-');
        colors[key] = hex;
    });

    const statusColors = {
        success: document.querySelector('#color-success').nextElementSibling.value,
        warning: document.querySelector('#color-warning').nextElementSibling.value,
        error: document.querySelector('#color-error').nextElementSibling.value,
        info: document.querySelector('#color-info').nextElementSibling.value
    };

    const neutralColors = {
        backgroundLight: document.querySelector('#color-bg-light').nextElementSibling.value,
        backgroundDark: document.querySelector('#color-bg-dark').nextElementSibling.value,
        textPrimary: document.querySelector('#color-text-primary').nextElementSibling.value,
        textSecondary: document.querySelector('#color-text-secondary').nextElementSibling.value,
        border: document.querySelector('#color-border').nextElementSibling.value
    };

    return {
        typography: {
            fontSizes: {
                base: `clamp(${inputs.fontBaseMin.value}rem, ${inputs.fontBasePref.value}vw, ${inputs.fontBaseMax.value}rem)`,
                h1: `clamp(${inputs.fontH1Min.value}rem, ${inputs.fontH1Pref.value}vw, ${inputs.fontH1Max.value}rem)`,
                h2: `clamp(${inputs.fontH2Min.value}rem, ${inputs.fontH2Pref.value}vw, ${inputs.fontH2Max.value}rem)`,
                h3: `clamp(${inputs.fontH3Min.value}rem, ${inputs.fontH3Pref.value}vw, ${inputs.fontH3Max.value}rem)`
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
            gapXs: inputs.gapXs.value + 'rem',
            gapSmall: inputs.gapSmall.value + 'rem',
            gapMedium: inputs.gapMedium.value + 'rem',
            gapLarge: inputs.gapLarge.value + 'rem',
            gapXl: inputs.gapXl.value + 'rem',
            sectionSpacing: inputs.sectionSpacing.value + 'rem',
            containerPadding: inputs.containerPadding.value + 'rem'
        },
        grid: {
            columns: parseInt(inputs.gridColumns.value),
            gap: inputs.gridGap.value + 'rem',
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
                small: inputs.btnHeightSm.value + 'rem',
                medium: inputs.btnHeightMd.value + 'rem',
                large: inputs.btnHeightLg.value + 'rem'
            },
            paddingX: inputs.btnPaddingX.value + 'rem'
        },
        forms: {
            inputHeight: inputs.inputHeight.value + 'rem',
            inputPadding: inputs.inputPadding.value + 'rem',
            focusRingWidth: inputs.focusRingWidth.value + 'px'
        },
        icons: {
            small: inputs.iconSm.value + 'rem',
            medium: inputs.iconMd.value + 'rem',
            large: inputs.iconLg.value + 'rem',
            xl: inputs.iconXl.value + 'rem'
        },
        colors: {
            primary: colors,
            status: statusColors,
            neutral: neutralColors
        }
    };
}

// Generate CSS
function generateCSS() {
    const data = generateJSON();
    let css = ':root {\n';
    
    css += '  /* Typography - Fluid Font Sizes (REM) */\n';
    css += `  --font-base: ${data.typography.fontSizes.base};\n`;
    css += `  --font-h1: ${data.typography.fontSizes.h1};\n`;
    css += `  --font-h2: ${data.typography.fontSizes.h2};\n`;
    css += `  --font-h3: ${data.typography.fontSizes.h3};\n`;
    css += `  --line-height: ${data.typography.lineHeight};\n\n`;
    
    css += '  /* Font Weights */\n';
    Object.entries(data.typography.fontWeights).forEach(([key, value]) => {
        css += `  --font-weight-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Spacing (REM) */\n';
    Object.entries(data.spacing).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Grid */\n';
    css += `  --grid-columns: ${data.grid.columns};\n`;
    css += `  --grid-gap: ${data.grid.gap};\n`;
    css += `  --container-max-width: ${data.grid.containerMaxWidth};\n\n`;
    
    css += '  /* Border Widths */\n';
    Object.entries(data.borders.widths).forEach(([key, value]) => {
        css += `  --border-${key}: ${value};\n`;
    });
    css += '\n  /* Border Radius */\n';
    Object.entries(data.borders.radius).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Shadows */\n';
    Object.entries(data.shadows).forEach(([key, value]) => {
        css += `  --shadow-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Transitions */\n';
    Object.entries(data.transitions.duration).forEach(([key, value]) => {
        css += `  --duration-${key}: ${value};\n`;
    });
    css += `  --easing: ${data.transitions.easing};\n\n`;
    
    css += '  /* Breakpoints */\n';
    Object.entries(data.breakpoints).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --bp-${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Z-Index */\n';
    Object.entries(data.zIndex).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --z-${cssKey}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Opacity */\n';
    Object.entries(data.opacity).forEach(([key, value]) => {
        css += `  --opacity-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Buttons (REM) */\n';
    Object.entries(data.buttons.heights).forEach(([key, value]) => {
        css += `  --btn-height-${key}: ${value};\n`;
    });
    css += `  --btn-padding-x: ${data.buttons.paddingX};\n\n`;
    
    css += '  /* Forms (REM) */\n';
    css += `  --input-height: ${data.forms.inputHeight};\n`;
    css += `  --input-padding: ${data.forms.inputPadding};\n`;
    css += `  --focus-ring-width: ${data.forms.focusRingWidth};\n\n`;
    
    css += '  /* Icons (REM) */\n';
    Object.entries(data.icons).forEach(([key, value]) => {
        css += `  --icon-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Primary Colors */\n';
    Object.entries(data.colors.primary).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
    });
    css += '\n';
    
    css += '  /* Status Colors */\n';
    Object.entries(data.colors.status).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
    });
    css += '\n';
    
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

// Copy JSON
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

// Reset
document.getElementById('reset').addEventListener('click', () => {
    if (confirm('Biztosan visszaállítod az alapértelmezett értékeket?')) {
        location.reload();
    }
});

// Initial update
updatePreview();
