
document.getElementById("file").addEventListener("change", function (event) {
    // this method is used to compress the image
    compressImage(event);
});

// compress the image
function compressImage(e) {
    // width and height can be modified as per the requirement or
    // we can take these as input from user
    const width = 500;
    const height = 300;

    // image quality ranges from 0 to 1
    const imageQuality = 1;
    
    const fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = width;
            elem.height = height;
            
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            ctx.canvas.toBlob((blob) => {
                const file = new File([blob], fileName, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                });
                // here we can upload the image to the server
                console.log(file);
                
                var newImg = document.createElement('img'),
                    url = URL.createObjectURL(blob);

                
                // if you no longer need to read the blob you can use below comments
                // newImg.onload = function() {
                //     URL.revokeObjectURL(url);
                // };

                newImg.src = url;
                
                const newElement = document.getElementById("outputImage");
                newElement.insertBefore(newImg, newElement.childNodes[0]);

                document.getElementById("downloadImg").href = url;
            }, 'image/jpeg', imageQuality);
        },
        reader.onerror = error => console.log(error);
    };
}