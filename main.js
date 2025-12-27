var jmp9a;

var config={
    name: "jnk181",
    status: "Just wasting it..."
}

var photo_albums=[
    {
        name:"Cats",
        icon:"./img/icons/cat_cookie.png",
        photos:[
            {
                src:"./media/photos/cats_tufny.jpg",
                caption:"Tufnica",
                date:"2025-03-20",
            },
            {
                src:"./media/photos/cats_micky.jpg",
                caption:"Mikica",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Nature",
        icon:"./img/icons/tree.png",
        photos:[
            {
                src:"./media/photos/nat1.jpg",
                caption:"",
                date:"2025-03-20",
            },
            {
                src:"./media/photos/nat2.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat3.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat4.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat5.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat6.jpg",
                caption:"",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Italy",
        icon:"./img/icons/italy.png",
        photos:[
            {
                src:"./media/photos/italy1.jpg",
                caption:"Tellaro",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/italy2.jpg",
                caption:"Siena",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/italy3.jpg",
                caption:"Malcesine",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/italy4.jpg",
                caption:"Lago di Braes",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Old photos",
        icon:"./img/icons/history.png",
        photos:[
            {
                src:"./media/photos/old1.jpg",
                caption:"E75",
                date:"2018",
            },
            {
                src:"./media/photos/old2.jpg",
                caption:"Tennis",
                date:"2018",
            },
            {
                src:"./media/photos/old3.jpg",
                caption:"Autokomanda",
                date:"2016",
            },
            {
                src:"./media/photos/old4.jpg",
                caption:"Vojvodina",
                date:"2019",
            },
            {
                src:"./media/photos/old5.jpg",
                caption:"Pink sunrise",
                date:"2019",
            }
        ]
    },
]

var notes=[
    {
        title:"Beachball",
        content:"<h1>Test</h1>",
        thumbnail:"./img/genericimage.jpg",
        short_description: "I like beachballs",
        date:"2025-10-02",
    },
    {
        title:"Coffee",
        content:"<h1>Coffee is good sometimes</h1>",
        thumbnail:"",
        short_description: "I like coffee",
        date:"2025-10-02",
    }
]

function previewNote(ind) {
        document.querySelector(`.overlay-black`).style.display="";
        document.querySelector(`.overlay-black .note-preview`).style.display="";
        document.querySelector(`.overlay-black .note-preview .header span.title`).innerHTML=notes[ind].title;
        document.querySelector(`.overlay-black .note-preview .inner-content h1.title`).innerHTML=notes[ind].title;
        document.querySelector(`.overlay-black .note-preview .inner-content .markdown-content`).innerHTML=notes[ind].content;
        document.querySelector(`.overlay-black .note-preview .inner-content span.date`).innerHTML=notes[ind].date;
    }

function previewImage(image) {
    document.querySelector(`.overlay-black`).style.display="";
    document.querySelector(`.overlay-black .image-preview`).style.display="";
    document.querySelector(`.overlay-black .image-preview .inner-content img.main`).src=image;
}

function showHiddenLinks() {
    const style = document.createElement('style');
    style.innerHTML = `
        .nts-hide {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    console.log("NTS elements are now visible.");
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(`span.profilename`).innerHTML=config.name;
    document.querySelector(`span.profilestatus`).innerHTML=config.status;
    document.querySelector(`title`).innerHTML=`${config.name} - MyExpressiveProfile`;

    document.querySelectorAll(`button.tabber`).forEach(button => {
        button.addEventListener('click', function() {
            console.log(this.getAttribute('data-tabname'));
            document.querySelectorAll(`.tab-container`).forEach(tabcont => tabcont.style.display="none");

            document.querySelector(`.tab-container.${this.getAttribute('data-tabname')}`).style.display="";

            document.querySelectorAll(`button.tabber`).forEach(btn => btn.disabled = false);
            this.disabled=true;
        });
    })
    jmp9a=new JMediaPlayer9WidgetAgent("mediaplayerwidget");

    photo_albums.forEach(photo_album => {
        var new_node = document.querySelector(`.profile-photos .photos-album.template`).cloneNode(true);
        new_node.querySelector('.header img.icon').src=photo_album.icon;
        new_node.querySelector('.header span.title').innerHTML=photo_album.name;
        photo_album.photos.forEach(photo => {
            var photo_node=document.querySelector(`.profile-photos .photo.template`).cloneNode(true);
            photo_node.querySelector(`img.photo-main`).src=photo.src;
            photo_node.querySelector(`span.caption`).innerHTML=photo.caption;
            photo_node.classList.remove('template');
            photo_node.addEventListener('click', function() {
                previewImage(photo.src)
            })
            new_node.querySelector(`.album-content`).appendChild(photo_node)
        })
        new_node.classList.remove('template');
        document.querySelector(`.profile-photos .inner-content`).appendChild(new_node);
    })

    document.querySelectorAll(`.profile-photos .photos-album .header`).forEach(item => {
        item.addEventListener('click', function() {
            if(!this.parentElement.classList.contains("open")) this.parentElement.classList.add("open");
            else {this.parentElement.classList.remove("open")}
        })
    })

    var cnt=0;
    notes.forEach(note => {
        var new_node = document.querySelector(`.note-item.template`).cloneNode(true);
        new_node.classList.remove("template");
        new_node.querySelector(`h1.title`).innerHTML=note.title;
        new_node.querySelector(`.date-header span`).innerHTML=note.date;
        new_node.dataset.index=cnt;
        cnt++;

        if(note.thumbnail!="") {
            new_node.querySelector(`img.thumb`).style.display="";
            new_node.querySelector(`img.thumb`).src=note.thumbnail;
        }
        else if(note.short_description!="") {
            new_node.querySelector(`p.short-description`).style.display="";
            new_node.querySelector(`p.short-description`).innerHTML=note.short_description;
        }

        document.querySelector(`.profile-notes .inner-content`).appendChild(new_node);
    });

    document.querySelectorAll(`.note-item`).forEach(item => {
        item.addEventListener('click', function() {
            previewNote(item.dataset.index)
        })
    })
});
