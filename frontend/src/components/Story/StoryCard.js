import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { STORY_VIEW } from "../../constants/routes";

class StoryCard extends Component
{
    render()
    {
        const { story } = this.props;
        return (
            <Table.Row>
                <Table.Cell>
                    <Link to={STORY_VIEW.replace(":story_id", story._id)}>
                        {story.title}
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    Hello
                </Table.Cell>
                <Table.Cell>
                    Hello
                </Table.Cell>
                <Table.Cell>
                    Hello
                </Table.Cell>
            </Table.Row>
        );
    }
}

class StoryTable extends Component
{
    TableCards = (stories) =>
    {
        const rows = stories.stories.map((story, index) =>
            (
                <StoryCard key={index} story={story} />
            ));

        return (
            <Table padded striped inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Other</Table.HeaderCell>
                        <Table.HeaderCell>Other</Table.HeaderCell>
                        <Table.HeaderCell>Other</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }

    render()
    {
        return (
            <this.TableCards stories={this.props.stories} />
        );
    }
}

export default StoryCard;
export { StoryTable };