import { Issue, SEVERITY } from './core/Issue';

function Item(text, isActive) {
  this.text = text;
  this.isActive = isActive;
  this.updated = Date.now();
  this.version = 1;
}

Item.prototype.toString = function() {
  return `${this.text},${this.isActive}`
};

Item.prototype.validate = function() {
  const issues = [];
  if (!this.text || typeof this.text !== 'string' || this.text.trim().length === 0) {
    issues.push(new Issue(SEVERITY.WARNING, 'text', 'Invalid text property'));
  }
  return issues;
};

export default Item;
