import React from "react";
import axios from "axios";

class ArticleDataComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleData:{},
        };

        this.getArticleData();
    }

    getArticleData(){
        axios.get('/api/article/'+this.props.articleID)
            .then(res=>{
                this.setState({articleData:res.data})
            })
            .catch(e=> {
                console.log(e);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.articleID!== prevProps.articleID){
            this.getArticleData();
        }
    }

    render() {
        return(
          <div>
              <h3 className="text-center">Article</h3>
              <h5 className="text-center">{this.state.articleData.articleTitle}</h5>
              <h5 className="text-center">{this.state.articleData.articleType===1 ? "Technical issue": this.state.articleData.articleType===2 ? "Support issue": "Template"}</h5>
              <h5 className="text-center">{new Date(parseInt(this.state.articleData.postedDate)).toDateString()}</h5>
              <p>{this.state.articleData.articleDesc}</p>

          </div>
        )
    }
}
export default ArticleDataComponent;

