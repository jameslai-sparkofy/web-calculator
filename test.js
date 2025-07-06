const { chromium } = require('playwright');

async function testCalculator() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('file://' + __dirname + '/index.html');
  
  // Test that page loads correctly
  await page.waitForSelector('.calculator');
  console.log('✓ Calculator loaded successfully');
  
  // Test color scheme - check if background is grayscale
  const bodyStyle = await page.evaluate(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    return computedStyle.background;
  });
  
  console.log('Body background:', bodyStyle);
  
  // Test button colors
  const buttonStyles = await page.evaluate(() => {
    const buttons = document.querySelectorAll('.btn');
    const styles = {};
    
    buttons.forEach((btn, index) => {
      const computedStyle = window.getComputedStyle(btn);
      const classList = Array.from(btn.classList);
      const buttonType = classList.find(cls => ['number', 'operator', 'clear', 'equals'].includes(cls)) || 'unknown';
      
      if (!styles[buttonType]) {
        styles[buttonType] = [];
      }
      styles[buttonType].push({
        background: computedStyle.backgroundColor,
        color: computedStyle.color,
        text: btn.textContent
      });
    });
    
    return styles;
  });
  
  console.log('Button styles:', JSON.stringify(buttonStyles, null, 2));
  
  // Test calculator functionality
  await page.click('button:has-text("7")');
  await page.click('button:has-text("+")');
  await page.click('button:has-text("3")');
  await page.click('button:has-text("=")');
  
  const result = await page.inputValue('#display');
  console.log('Calculation result:', result);
  
  if (result === '10') {
    console.log('✓ Calculator functionality working correctly');
  } else {
    console.log('✗ Calculator functionality failed');
  }
  
  // Test display color
  const displayStyle = await page.evaluate(() => {
    const display = document.getElementById('display');
    const computedStyle = window.getComputedStyle(display);
    return {
      background: computedStyle.backgroundColor,
      color: computedStyle.color,
      border: computedStyle.border
    };
  });
  
  console.log('Display styles:', displayStyle);
  
  // Check if colors are grayscale (no strong color saturation)
  const isGrayscale = await page.evaluate(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    const background = computedStyle.backgroundColor;
    
    // Check if background contains rgb values that are similar (grayscale)
    const rgbMatch = background.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      return diff < 50; // Allow small differences for grayscale
    }
    
    return false;
  });
  
  console.log('Color scheme is grayscale:', isGrayscale);
  
  if (isGrayscale) {
    console.log('✓ Successfully converted to black and white theme');
  } else {
    console.log('✗ Color scheme conversion may need adjustment');
  }
  
  await browser.close();
}

testCalculator().catch(console.error);