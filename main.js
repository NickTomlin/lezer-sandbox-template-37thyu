import './style.css';

import { basicSetup, EditorView } from 'codemirror';
import { language } from './languages/example-language.js';

const examples = await import.meta.glob('./examples/*', { as: 'raw' });
let examplesDiv = document.getElementById('examples');

function parse(ele, text) {
  ele.innerHTML = language.parser.parse(text);
}

for (let [file, readText] of Object.entries(examples)) {
  const text = await readText();

  examplesDiv.appendChild(document.createElement('h4')).textContent =
    file.replace('./examples/', '');

  let el = document.createElement('div');
  examplesDiv.appendChild(el);

  const parsed = document.createElement('pre');
  parse(parsed, text);

  const updater = EditorView.updateListener.of((e) => {
    parse(parsed, e.state.doc.toString());
  });

  el.appendChild(parsed);
  new EditorView({
    doc: text,
    extensions: [basicSetup, language, updater],
    parent: el,
  });
}
