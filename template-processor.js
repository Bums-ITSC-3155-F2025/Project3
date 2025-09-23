function TemplateProcessor(template){
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function(dictionary){
    return this.template.replace(/{{(.+?)}}/g, function(match, key){
        return dictionary[key];
    });
};

const t1 = "My name is {{name}} and I am from {{city}}";
const p1 = new TemplateProcessor(t1);
const dictionary = { name: "John", city: "New York" };

console.log(p1.fillIn({name: "Bob"}));

const t2 = " This is a test. ";
const p2 = new TemplateProcessor(t2);
console.log(p2.fillIn(dictionary));

