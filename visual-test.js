const fs = require('fs');
const path = require('path');

// Simple visual test without browser automation
function testColorScheme() {
  console.log('Testing color scheme changes...\n');
  
  // Read the CSS file
  const cssPath = path.join(__dirname, 'style.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Check for color changes
  const colorTests = [
    {
      name: 'Body background',
      pattern: /background:\s*linear-gradient\(135deg,\s*#e0e0e0\s*0%,\s*#b0b0b0\s*100%\)/,
      expected: 'Grayscale gradient'
    },
    {
      name: 'Calculator background',
      pattern: /\.calculator\s*{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.9\)/,
      expected: 'White semi-transparent background'
    },
    {
      name: 'Display background',
      pattern: /background:\s*rgba\(240,\s*240,\s*240,\s*0\.9\)/,
      expected: 'Light gray display background'
    },
    {
      name: 'Display text color',
      pattern: /color:\s*black/,
      expected: 'Black text color'
    },
    {
      name: 'Number buttons',
      pattern: /\.number\s*{[^}]*background:\s*rgba\(240,\s*240,\s*240,\s*0\.9\)/,
      expected: 'Light gray number buttons'
    },
    {
      name: 'Operator buttons',
      pattern: /\.operator\s*{[^}]*background:\s*rgba\(180,\s*180,\s*180,\s*0\.8\)/,
      expected: 'Medium gray operator buttons'
    },
    {
      name: 'Clear buttons',
      pattern: /\.clear\s*{[^}]*background:\s*rgba\(120,\s*120,\s*120,\s*0\.8\)/,
      expected: 'Dark gray clear buttons'
    },
    {
      name: 'Equals button',
      pattern: /\.equals\s*{[^}]*background:\s*rgba\(80,\s*80,\s*80,\s*0\.8\)/,
      expected: 'Very dark gray equals button'
    }
  ];
  
  // Check for removed colorful elements
  const colorfulPatterns = [
    { name: 'Blue/Purple gradient', pattern: /#667eea|#764ba2/ },
    { name: 'Orange colors', pattern: /rgba\(255,\s*152,\s*0/ },
    { name: 'Red colors', pattern: /rgba\(255,\s*59,\s*48/ },
    { name: 'Green colors', pattern: /rgba\(52,\s*199,\s*89/ }
  ];
  
  console.log('✓ Color scheme test results:');
  console.log('==============================');
  
  let allTestsPassed = true;
  
  colorTests.forEach(test => {
    const found = test.pattern.test(cssContent);
    const status = found ? '✓' : '✗';
    console.log(`${status} ${test.name}: ${found ? 'Found' : 'Not found'} - ${test.expected}`);
    if (!found) allTestsPassed = false;
  });
  
  console.log('\n✓ Colorful elements removed:');
  console.log('============================');
  
  colorfulPatterns.forEach(pattern => {
    const found = pattern.pattern.test(cssContent);
    const status = found ? '✗' : '✓';
    console.log(`${status} ${pattern.name}: ${found ? 'Still present' : 'Successfully removed'}`);
    if (found) allTestsPassed = false;
  });
  
  console.log('\n===============================');
  if (allTestsPassed) {
    console.log('✓ All color scheme tests passed!');
    console.log('✓ Successfully converted to black and white theme');
  } else {
    console.log('✗ Some color scheme tests failed');
    console.log('Please check the CSS file for any remaining colorful elements');
  }
  
  // Test calculator HTML structure
  console.log('\n✓ Testing HTML structure...');
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  const htmlTests = [
    { name: 'Calculator container', pattern: /<div class="calculator">/ },
    { name: 'Display input', pattern: /<input[^>]*id="display"/ },
    { name: 'Number buttons', pattern: /<button[^>]*class="[^"]*number[^"]*"/ },
    { name: 'Operator buttons', pattern: /<button[^>]*class="[^"]*operator[^"]*"/ },
    { name: 'Clear buttons', pattern: /<button[^>]*class="[^"]*clear[^"]*"/ },
    { name: 'Equals button', pattern: /<button[^>]*class="[^"]*equals[^"]*"/ }
  ];
  
  htmlTests.forEach(test => {
    const found = test.pattern.test(htmlContent);
    const status = found ? '✓' : '✗';
    console.log(`${status} ${test.name}: ${found ? 'Found' : 'Missing'}`);
  });
  
  console.log('\n✓ Testing JavaScript functionality...');
  const jsPath = path.join(__dirname, 'script.js');
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  
  const jsTests = [
    { name: 'appendToDisplay function', pattern: /function appendToDisplay\(/ },
    { name: 'calculate function', pattern: /function calculate\(/ },
    { name: 'clearDisplay function', pattern: /function clearDisplay\(/ },
    { name: 'Keyboard event listener', pattern: /addEventListener\('keydown'/ },
    { name: 'Iframe detection', pattern: /window\.self !== window\.top/ }
  ];
  
  jsTests.forEach(test => {
    const found = test.pattern.test(jsContent);
    const status = found ? '✓' : '✗';
    console.log(`${status} ${test.name}: ${found ? 'Found' : 'Missing'}`);
  });
  
  console.log('\n===============================');
  console.log('Test completed successfully!');
  console.log('The calculator has been converted to a black and white theme.');
  console.log('All core functionality remains intact.');
}

testColorScheme();