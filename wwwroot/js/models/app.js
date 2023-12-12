import { ShoppingList } from '../models/shopping-list.js'
import mustache from './mustache.js';


const demoTemplate = `

{{#list}}
    <p>
    <strong>Name</strong> {{Name}}
    <br>
    <strong>Budget</strong {{{displayBudget}}}
    </p>
    <hr>
{{#lists}}

`;


async function showShoppingList() { 

    let url = "api/ShoppingList";

    let request = await fetch(url);

    let result = await request.json();

    let shoppingLists = [];

    result.forEach((settings) => {

        shoppingLists.push(new ShoppingList(settings));

    });

    window.lastResult = result;

    let context = {
        list: []
    };


    context.lists = shoppingLists.sort((a, b) => {
        return a.Name.localeCompare(b.Name)
    });

    window.currentContext = context; 

    let html = mustache.render(demoTemplate, context);

    renderShoppingList(html);
}
function renderShoppingList(html) { 

    let target = document.querySelector("#ShoppingListArea");

    target.innerHTML = html;
}
showShoppingList();

window.sortShoppingListsByBudget = () => {
     

    const shoppingList = window.currentContext.lists.sort((a,b) => {
        return a.Budget - b.Budget;

    });

    const newContext = {
        lists: shoppingLists
    };


    let html = mustache.render(demoTemplate, newContext);

    renderShoppingList(html); 
}

