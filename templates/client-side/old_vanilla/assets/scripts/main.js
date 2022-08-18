

document.addEventListener("DOMContentLoaded", () => {

    // Bind valueChanged and elementClick to all 'pepperi-field' elements
    const elements = document.getElementsByClassName('pep-field');
    Object.values(elements).forEach(element => {
        element.addEventListener('valueChanged', event => this.onValueChanged(event));
        element.addEventListener('elementClicked', event => this.onElementClicked(event));
    });

    const menuElements = document.getElementsByTagName('pep-menu');

    Object.values(menuElements).forEach(element => {
        element.addEventListener('notifyMenuItemClicked', event => this.onMenuItemClicked(event));
    });

});


function onElementClicked(e) {
    console.log(`Element Clicked:\n{\n    ApiName: ${e.detail.apiName}\n    Value: ${e.detail.value}\n}`);
}

function onValueChanged(e) {
    console.log(`Value Changed:\n{\n    ApiName: ${e.detail.apiName}\n    Value: ${e.detail.value}\n}`);
}

function onMenuItemClicked(e) {
    console.log(`Menu Item Clicked:\n{\n    ApiName: ${e.detail.apiName}\n    Value: ${e.detail.value}\n}`);
}
