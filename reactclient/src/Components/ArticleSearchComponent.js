import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ArticleTableFunction from "../Functions/ArticleTableFunction";

class ArticleSearchComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleType:'',
            searchText:'',
            message:'',
            searchType:0,
            foundArticles:[],
            articlesLoaded:false,
            tableReload:0,
        };

        this.searchText = this.searchText.bind(this);
    }

    searchText(e){
        this.setState({searchText:e.target.value});
    }


   async getArticles(){

        this.setState({message:''});

        if(this.state.searchText===""){
            this.setState({message:"Search text is empty!"});
            return
        }

        if(this.state.searchType===0){
            this.setState({message:"Choose search by option!"});
            return
        }

       await axios.get('/api/article/'+this.state.searchType+"/"+this.state.searchText)
            .then(res=>{
                if(res.data.length===0){
                    this.setState({message:"No articles found!"})
                }else{
                    this.setState({
                        tableReload:0,
                        foundArticles:res.data,
                        articlesLoaded:true,
                    });
                }
            })
            .catch(e=> {
                console.log(e);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.state.foundArticles!==prevState.foundArticles){
            this.setState({tableReload:1})
        }
    }

    displayArticleData(tableReload){
        if(tableReload===0){
            return null
        }else if (tableReload===1){
            return <ArticleTableFunction array={this.state.foundArticles}/>
        }

    }


    render() {
        return(
            <div>
                <h3 className="bg-warning text-center">{this.state.message}</h3>
                <h4 className="text-center">Search for existing article</h4>

               <div className="text-center">
                   <input type="text" placeholder="Specify search string" className="m-xl-auto col-xl-6" value={this.state.searchText} onChange={this.searchText}/>
                   <h5>Search by:</h5>

                   <div className="form-check form-check-inline">
                       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                              value="option1" onClick={()=>{this.setState({searchType:1})}}/>
                       <label className="form-check-label" htmlFor="inlineRadio1">Title</label>
                   </div>

                   <div className="form-check form-check-inline">
                       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                              value="option2" onClick={()=>{this.setState({searchType:2})}}/>
                       <label className="form-check-label" htmlFor="inlineRadio1">Description</label>
                   </div>

                   <Button variant="outline-dark" size='sm' onClick={()=>this.getArticles()}>Find articles</Button>
               </div>

                <hr/>

                {this.state.articlesLoaded? (this.displayArticleData(this.state.tableReload)):null}

            </div>
        )
    }
}
export default ArticleSearchComponent;

