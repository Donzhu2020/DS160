/**
 * Post-build script to fix ES6 import statements in extension scripts
 * Converts ES modules to IIFE format for browser extension compatibility
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function fixExtensionScripts() {
  const storageModulePath = join(process.cwd(), 'dist/storage.js');
  
  try {
    // Read the storage module to inline it
    const storageModule = readFileSync(storageModulePath, 'utf-8');
    
    // Extract the storage module exports
    const storageCode = storageModule
      .replace(/export\s*\{[^}]*\};?/g, '') // Remove export statements
      .replace(/export\s+/g, ''); // Remove other export keywords
    
    // Fix content script
    fixScript('dist/content/translation.js', storageCode, 'content script');
    
    // Fix popup script
    fixScript('dist/popup/popup.js', storageCode, 'popup script');
    
  } catch (error) {
    console.error('Failed to fix extension scripts:', error.message);
  }
}

function fixScript(scriptPath, storageCode, scriptName) {
  try {
    const fullPath = join(process.cwd(), scriptPath);
    let script = readFileSync(fullPath, 'utf-8');
    
    // Check if already wrapped in IIFE
    if (script.trim().startsWith('(function()') || script.trim().startsWith('!function')) {
      console.log(`✓ ${scriptName} already fixed`);
      return;
    }
    
    // Remove the import statement
    script = script.replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\s*/g, '');
    
    // Wrap everything in an IIFE
    const wrappedScript = `
(function() {
  'use strict';
  
  // Inlined storage module
  ${storageCode}
  
  // Main script
  ${script}
})();
`;
    
    // Write the fixed script
    writeFileSync(fullPath, wrappedScript);
    console.log(`✓ Fixed ${scriptName} ES6 imports`);
    
  } catch (error) {
    console.warn(`Failed to fix ${scriptName}:`, error.message);
  }
}

fixExtensionScripts();
