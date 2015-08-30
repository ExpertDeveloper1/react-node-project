var React = require('react');
var $ = require('jquery');


function sortByConfig(sortConfig) {

    var sortNum = sortConfig.number - 1;
    console.log("sortByConfig:" + sortNum);
    return function (a, b) {
        if (a[sortNum] > b[sortNum]) {
            return sortConfig.asc === 1 ? 1 : -1;
        } else {
            if (a[sortNum] === b[sortNum]) {
                return 0;
            } else {
                return sortConfig.asc === 1 ? -1 : 1;
            }
        }
    };

}

function tableConvert(config) {

    return function (object) {
        return config.map(function (configContent) {
            return object[configContent];
        });

    }
}


module.exports = React.createClass({
    propTypes: {
        header: React.PropTypes.array.isRequired,
        body: React.PropTypes.array.isRequired,
        sort: React.PropTypes.object.isRequired,
        url: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {
        return {header: [], body: [], sort: {number: 1, asc: -1}, url: ''};
    },
    getInitialState: function () {
        // console.log(this.props.url);
        return {commitServerInfo: []};
    },
    getAndProcess: function (props) {
        $.ajax({
            url: props.url,
            dataType: 'json',
            success: function (data) {
                // this.setState({commitServerInfo: JSON.parse(data)});
                //根据this.props.body过滤并排序commitServerInfo
                var originCommitInfo = JSON.parse(data);
                var sortCommitInfo = originCommitInfo.map(tableConvert(props.body));

                ////sort
                sortCommitInfo.sort(sortByConfig(props.sort));

                this.setState({commitServerInfo: sortCommitInfo});

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        console.log("JiraBugsShow componentDidMount:" + this.props.url);
        this.getAndProcess(this.props);

    },
    componentWillReceiveProps: function (nextProps) {
        console.log("JiraBugsShow componentDidUpdate :" + nextProps.url);
        this.getAndProcess(nextProps);
    },
    sortTableByIndex: function (columnNum) {
        columnNum = columnNum + 1;
        var curInfo = this.state.commitServerInfo;
        curInfo.sort(sortByConfig({number: columnNum, asc: -1}));
        console.log(curInfo);
        this.setState({commitServerInfo: curInfo});
    },
    render: function () {
        return <div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    {this.props.header.map(function (headerEle) {
                        return <th key={arguments[1]}
                                   onClick={this.sortTableByIndex.bind(this,arguments[1])}>{headerEle}</th>;
                    }, this)}
                </tr>
                </thead>
                <tbody>
                {this.state.commitServerInfo.map(function (row) {
                    return <tr key={arguments[1]}>
                        {row.map(function (td) {
                            return <td key={arguments[1]}>
                                {td}
                            </td>;
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>;
    }
})
;
