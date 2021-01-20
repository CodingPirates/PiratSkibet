const React = require("react");
const PropTypes = require("prop-types");

class Pagination extends React.Component {

    /////////////////////////////////
    // Init
    /////////////////////////////////

    static get propTypes() {
        return {
            page: PropTypes.number,
            wrap: PropTypes.number,
            pages: PropTypes.number.isRequired,
            onChange: PropTypes.func,
        };
    }

    static get defaultProps() {
        return {
            page: 1,
            wrap: 2,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            page: props.page,
            pages: props.pages,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let state = {};

        if (prevProps.page !== this.props.page) {
            state.page = this.props.page;
        }

        if (prevProps.pages !== this.props.pages) {
            state.pages = this.props.pages;

            if (state.pages < state.page) {
                state.page = state.pages;
            }
        }

        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    /////////////////////////////////
    // Getters
    /////////////////////////////////

    get pageButtons() {
        const start = {
            from: 1,
            to: Math.min(this.props.wrap, this.state.pages)
        };

        const active = {
            from: Math.min(Math.max(start.to + 1, this.state.page - this.props.wrap), this.state.pages),
            to: Math.min(this.state.page + this.props.wrap, this.state.pages)
        };

        const end = {
            from: Math.min(Math.max(active.to + 1, this.state.pages - (this.props.wrap - 1)), this.state.pages),
            to: this.state.pages
        };

        let links = [];

        [start, active, end].forEach(interval => {
            if (links[links.length - 1] >= interval.from) {
                return;
            }

            for (let i = interval.from; i <= interval.to; i++) {
                links.push(i);
            }
        });

        return links;
    }

    get shouldRender() {
        return this.state.pages > 1;
    }

    /////////////////////////////////
    // Event handlers
    /////////////////////////////////

    onChange = () => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.page);
        }
    }

    changePage(page) {
        if (page !== this.state.page) {
            this.setState({page: page}, this.onChange);
        }
    }

    prev = () => {
        const prev = this.state.page - 1;
        if (prev < 1) return;

        this.changePage(prev);
    }

    next = () => {
        const next = this.state.page + 1;
        if (next > this.state.pages) return;

        this.changePage(next);
    }

    /////////////////////////////////
    // Renders
    /////////////////////////////////

    renderPageButtons() {
        const seperator = (<span className="pagination-item seperator">...</span>);

        return this.pageButtons.map((page, index) => {
            const classes = this.state.page === page ?
                'active pagination-item' :
                'pagination-item';

            const button = (<button key={index} className={classes} onClick={() => this.changePage(page)}>{page}</button>);

            const next = this.pageButtons[index + 1];

            if (typeof next === 'undefined' || next === page + 1) return button;

            return (
                <React.Fragment key={index}>
                    {button}
                    {seperator}
                </React.Fragment>
            );
        });
    }

    render() {
        if (!this.shouldRender) return null;

        const prevClass = this.state.page === 1 ?
            'disabled' :
            '';

        const nextClass = this.state.page === this.state.pages ?
            'disabled' :
            '';
//<Icon name="arrow-small-left" title="prev" />
//<Icon name="arrow-small-right" title="next" />
        return (
            <div className="pagination">
                <button className={['pagination-item', 'prev', prevClass].filter(c => c).join(' ')} onClick={this.prev}>
                    PREV
                </button>
                <div className="pagination-inner">
                    {this.renderPageButtons()}
                </div>
                <button className={['pagination-item', 'next', nextClass].filter(c => c).join(' ')} onClick={this.next}>
                    NEXT
                </button>
            </div>
        );
    }
}

module.exports = Pagination;
