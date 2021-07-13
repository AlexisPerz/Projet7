class Post{
    constructor(jsonPost){
        jsonPost && Object.assign(this, jsonPost);
    }

    getFormatedDate(){
        let timestamp = Date.parse(this.createdAt);
        let date = new Date(timestamp);
        return date.toLocaleDateString();
    }

    displayWithImage(user){
        return `<div class="col-12 mt-5">
        <div id="cardpost" class="card article">
            <div class="card-header ">
                <h5 class="card-title d-flex justify-content-between"><span class="publication-date">${ this.getFormatedDate() }</span></h5>
            </div>
            <div class="imagepost">
                <img src="${ this.image }" class="card-img-top">
            </div>
            <div class="card-body">
                <p class="card-text">${ this.message }</p>
                <i class="fas fa-pencil-alt ${(user.id == this.userId || user.isAdmin)?"":"disable"}" data-toggle="modal" data-target="#modifier-modal" data-id="${this.id}" data-text="${this.message}"></i>
                <i class="fas fa-trash-alt ${(user.userId == this.userId || user.isAdmin)?"":"disable"}" data-id="${this.id}"></i>
            </div>
            <div class="card-footer">
                ${this.displayComment()}
            </div>
                <div>
                    <textarea class="form-control" name="message" placeholder="Écrivez un commentaire..." required></textarea>
                </div>
            </div>
            <div>
                <button id="commenter" class="btn btn-primary" type="submit">Répondre</button>
            </div>
        </div>`
    }

    displayWithOutImage(user){
        return `<div class="col-12 mt-5 post">
        <div id="cardpost" class="card article">
            <div class="card-header ">
                <h5 class="card-title d-flex justify-content-between"><span class="publication-date">${ this.getFormatedDate() }</span></h5>
            </div>
            <div class="card-body">
                <p class="card-text">${ this.message }</p>
                <i class="fas fa-pencil-alt ${(user.userId == this.userId || user.isAdmin)?"":"disable"}" data-toggle="modal" data-target="#modifier-modal" data-id="${this.id}" data-text="${this.message}"></i>
                <i class="fas fa-trash-alt ${(user.userId == this.userId || user.isAdmin)?"":"disable"}" data-id="${this.id}"></i>
            </div>
            <div class="card-footer">
                ${this.displayComment()}
            </div>
                <div>
                    <textarea class="form-control" name="message" placeholder="Écrivez un commentaire..." required></textarea>
                </div>
            </div>
            <div>
                <button id="commenter" class="btn btn-primary" type="submit">Répondre</button>
            </div>
        </div>`
    }

    display(){
        let user = JSON.parse(localStorage.getItem("user"));
        if(this.image != null){
            return this.displayWithImage(user);
        }else{
            return this.displayWithOutImage(user);
        }
    }

    displayComment(){
        let listComment = "";
        for(let comment of this.comments){
            comment = new Commentaire(comment);
            listComment += comment.display();
        }

    return listComment;
    }

    delete(){

    }
}