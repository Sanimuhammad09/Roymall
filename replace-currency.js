import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir('/Users/hello/Documents/Roymall web/src');
let totalReplacements = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // Replace $ followed by a digit
    newContent = newContent.replace(/\$(?=\d)/g, '₦');
    
    // Replace '$' with '₦'
    newContent = newContent.replace(/'\$'/g, "'₦'");
    newContent = newContent.replace(/"\$"/g, '"₦"');
    newContent = newContent.replace(/`\$`/g, '`₦`');
    
    // Replace >${ with >₦{
    newContent = newContent.replace(/>\$(?=\{)/g, '>₦');
    
    // Replace whitespace followed by ${ with whitespace followed by ₦{
    newContent = newContent.replace(/([ \t\n\r])\$(?=\{)/g, '$1₦');

    // Replace US Dollar ($) with Naira (₦)
    newContent = newContent.replace(/US Dollar \(\$\)/g, 'Naira (₦)');
    newContent = newContent.replace(/value="USD"/g, 'value="NGN"');

    // Replace literal dollar signs in formatting like `$` + value
    newContent = newContent.replace(/'\$' \+/g, "'₦' +");
    newContent = newContent.replace(/"\$" \+/g, '"₦" +');
    
    // Sometimes it's right after a curly brace or newline inside JSX, e.g.
    // <div>${total}</div> => <div>₦{total}</div> (handled by >$)
    // or
    //          ${total} =>          ₦{total} (handled by whitespace$)

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated:', file);
        totalReplacements++;
    }
});

console.log('Total files updated:', totalReplacements);
