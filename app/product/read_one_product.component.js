//component that contains logic to read one product
window.ReadOneProductComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            name: '',
            description: '',
            age: '',
            category_name: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;
        const hostURL = location.protocol + '//' + location.hostname + location.pathname;
        this.serverRequest = $.get(hostURL+"api/product/read_one.php?id=" + productId,
            function(product) {
                this.setState({category_name: product.category_name});
                this.setState({id: product.id});
                this.setState({name:product.name});
                this.setState({description: product.description});
                this.setState({age: product.age});
            }.bind(this));

        $('.page-header h1').text("Read Product");
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
            <div>
                <a href="#"
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary m-b-1em'> List Pet
                </a>

                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{this.state.description}</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                {/* <td>{parseFloat(this.state.age).toFixed(2)}</td> */}
                                <td>{this.state.age}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{this.state.category_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});