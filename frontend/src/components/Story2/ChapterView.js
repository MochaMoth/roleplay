import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import axios from "axios";
import withAuthStatic from "../firebase/Session/withAuthStatic";
import { Table, Placeholder, Button, Header, Image } from "semantic-ui-react";
import { BACKEND, CHAPTER_VIEW } from "../../constants/routes";
import { makeCancelable } from "../../constants/extensions";

const INITIAL_STATE = {
    chapter: null,
    showReplyForm: false
}

class ChapterView extends Component
{
    promises = [];

    constructor(props)
    {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount()
    {
        const { story_id, chapter_name } = this.props.match.params;
        this.promises.splice(this.promises.length - 1, 0, makeCancelable(axios.get(`${BACKEND}${CHAPTER_VIEW.replace(":story_id", story_id).replace(":chapter_name", chapter_name)}`)
            .then(res =>
            {
                this.setState({ chapter: res.data.chapter });
            })
            .catch(error =>
            {
                console.log(error);
            })));
    }

    componentWillUnmount()
    {
        this.promises.forEach(promise => promise.cancel());
    }

    render()
    {
        const { state, props } = this;
        const { chapter, showReplyForm } = state;
        const { userInfo } = props;

        return (
            <div>
                {!!state.chapter ?
                    <Table className="basic-table">
                        <Table.Body>
                            <Table.Row><Table.Cell>
                                {!!userInfo ?
                                    <Button primary={!showReplyForm} secondary={showReplyForm} onClick={this.createParagraphClick}>
                                        {showReplyForm ? "Cancel" : "Create Paragraph"}
                                    </Button> :
                                    null
                                }
                                {
                                    showReplyForm ?
                                        null ://<CreatePost /> :
                                        null
                                }
                            </Table.Cell></Table.Row>
                            {
                                chapter.posts.map((post, index) =>
                                {
                                    const TableBody = (post) => (
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <div className="characterPlacard" style={{ width: "250px", float: "left", marginRight: "15px" }}>
                                                        <center><Header>{post.author.name}</Header></center>
                                                        <Image floated='left' src={post.author.appearance.image} />
                                                    </div>
                                                    <pre style={{ margin: "0" }}>{post.description}</pre>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    );

                                    return (
                                        <Table.Row key={index}><Table.Cell>
                                            {(index === chapter.posts.length - 1) ?
                                                <Table attached="bottom">{TableBody(post)}</Table> :
                                                <Table attached>{TableBody(post)}</Table>
                                            }
                                        </Table.Cell></Table.Row>
                                    )
                                })
                            }

                        </Table.Body>
                    </Table>
                    :
                    <Placeholder fluid>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                }
            </div>
        );
    }
}

export default compose(withRouter, withAuthStatic)(ChapterView);