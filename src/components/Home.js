const Home = () => {
    return (
        <>
            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <p><a href="/">About</a></p>
                    </div>
                    <div className="col-sm-8 text-left">
                        <h1>Welcome</h1>
                        <p>Here to talk Banana Bread and much more. Let's dive into.</p>
                        <hr/>
                        <h3>Banana Bread History</h3>
                        <p>In the late nineteenth century...</p>
                    </div>
                    <div className="col-sm-2 sidenav">
                        <div className="well">
                            <p>Learn more about our amazing Banana Bread! Join us at Banana Bread Co</p>
                        </div>
                        <div className="well">
                            <p>Did you know Banana's appeared in the U.S. in 1870?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;