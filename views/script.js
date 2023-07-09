fetch("products.json")
.then(function(response){

    return response.json();
})

.then(function(products){

    let placeholder = document.querySelector("#data -output");
    let out = "";
    for(let product of products){
    out += `
    <tr>
        <td><img src='${product.img}'> </td>
        <td>${product.name}</td>
        <td>${product.desc}</td>
    </tr>
    `;
    }
    placeholder.innerHTML = out;
})
