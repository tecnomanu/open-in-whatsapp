const phoneRegex = new RegExp(/(?:\+)(?:\d?){1,3}(?: ?)((?:\(?)((?:0?)(?:\d){1,3})((?:\)?))(?: ?))(?:\d-?){1,8}/g);
const regExChar = new RegExp(/(?: |\(|-|\))/g);
const extensionId = 'fklaakkgfkbjhpmkkimjhoekmjcdfmdd';
const iconOpenInWhatsApp = `chrome-extension://${extensionId}/icons/icon_128.png`;
const styles = `
    a.___onwsp { position: relative; display: inline-block; padding: 0 10px; }
    a.___onwsp[title]:hover::after {
    display:block;
    color:white;
    background-color:black;
    content: attr(title);
    position: absolute;
    top: -10px;
    left: 10px;
    width:250px;
    text-align:center;
    line-height:1.1rem;
    font-size:1rem;
    padding:4px;
    border-radius:3px;
  }
`
// Función para reemplazar números de teléfono con enlaces
function replacePhoneNumbers() {
    addStyles();
    // Obtener todos los elementos de texto en la página, excluyendo los enlaces
    const textElements = document.querySelectorAll(`body *:not(a)`);
    // Iterar a través de cada elemento de texto
    textElements.forEach((element) => {
        // Obtener el texto del elemento
        const elementText = element.textContent;
        if(phoneRegex.test(elementText)){
            const elementFind = getParentContainingText(element)
            if(elementFind){
                var elemStyle = window.getComputedStyle(elementFind, null).getPropertyValue('font-size');
                // Reemplazar números de teléfono en el texto con enlaces a WhatsApp Web
                const replacedText = elementFind.innerHTML.replace(phoneRegex, (phoneNumber) => {
                    const cleanNumber = phoneNumber.replace(regExChar, '');
                    return `<a href="https://wa.me/${cleanNumber}" class="___onwsp"
                                style="height: ${elemStyle};"
                                target="_blank" title="Abrir ${cleanNumber} con Open In Whatsapp">
                                <img style="height: ${elemStyle};" src="${iconOpenInWhatsApp}" >
                            </a>${phoneNumber}`;
                });

                // Reemplazar el contenido del elemento con el texto modificado
                elementFind.innerHTML = replacedText;
            }
        }
    });
}  

function getParentContainingText(element) {
    // Iterar a través de cada elemento hijo del elemento actual
    let elementFind = false;
    for (const child of element.children) {
      // Si el elemento hijo contiene el texto buscado, retornar el elemento padre
      if (phoneRegex.test(child.textContent)) {
        if(child.children.length > 0) {
            const result = getParentContainingText(child);
            elementFind = result ?? child;
        }else
            elementFind = child;
      }
    }
    return elementFind;
}

function addStyles(){
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

if (document.readyState !== 'loading') {
    replacePhoneNumbers();
} else 
    document.addEventListener('DOMContentLoaded', replacePhoneNumbers);