const htmlFile = (fileName, imgUrl) => `
        <div class="file">
            <div class="file_img">
                <img src="${imgUrl}" alt="">
            </div>
            <p class="filename">${fileName}</p>
        </div>
    `;

const loadFiles = () => {
    fetch('/api/v1/media/myfiles')
    .then(response => {
        return response.json();
    })
    .then(data => {
        for (let i = 0; i < data.data.length; i++)
        {
            $("#files_holder").append(htmlFile(data.data[i].file_name, `/api/v1/files/${data.data.file_key}`));
            console.log("hello world")
        }
    })
    .catch(err => {
        console.log("Ошибка: ", err);
    });
};

$(document).ready(function() {

    loadFiles();

    $(".file").click(function() {
        $("#toshow").attr("src", $(this).find("img").attr("src"));
        $("#overlay").show(200);
    });

    $("#overlay").click(function () {$(this).hide(200)});

    $(".load_file_btn").click(function() {
        $("#upload_overlay").show(200);
    });
    
    $("#upload_overlay").click(function(el) {
        if ($(el.target).attr("class") == "black_overlay") {
            $(this).hide(200);
        }
    });

    $(".file_upload_box").click(function() {
        $("#file_input").trigger("click");
    });

    $("#file_input").on("change", async function() {
        const file = $(this)[0].files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('api/v1/files/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                alert('Файл успешно загружен! URL: ' + result.url);
            } else {
                alert('Ошибка при загрузке файла');
                console.log(response);
            }
        } catch (err) {
            console.log("Oshibka: ", err);
        }
        
    });

    const imageKey = 'RobloxScreenShot20250308_171846150.png';
    const imageUrl = `/api/v1/files/${imageKey}`;

    $("#myImage").attr("src", imageUrl);



});
