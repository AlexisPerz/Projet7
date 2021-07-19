class Commentaire{
    constructor(jsonCommentaire){
        jsonCommentaire && Object.assign(this, jsonCommentaire);
    }

    getFormatedDate(){
        let timestamp = Date.parse(this.createdAt);
        let date = new Date(timestamp);
        return date.toLocaleDateString();
    }

    display(){
        return `<div class="col-12 mt-5 comment">
                    <div class="card article">
                        <div class="card-header ">
                            <h5 class="card-title d-flex justify-content-between"><span class="publication-date">${ this.getFormatedDate() }</span></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${ this.message }</p>
                            <i class="fas fa-trash-alt removecomment" data-id="${this.id}"></i>
                        </div>
                    </div>
                </div>`
    }
}