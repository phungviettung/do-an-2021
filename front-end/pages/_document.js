import Document, {Html, Head, Main, NextScript} from 'next/document'
import fs from 'fs'
class MyDocument extends Document{
    render(){
        return(
            <Html lang="en">
                <Head>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                    
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;900&display=swap" rel="stylesheet"/>
                
                    <link rel="stylesheet" href="/static/css/bootstrap.min.css" type="text/css"/>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
                    <link rel="stylesheet" href="/static/css/font-awesome.min.css" type="text/css"/>
                    <link rel="stylesheet" href="/static/css/elegant-icons.css" type="text/css"/>
                    {/* <link rel="stylesheet" href="/static/css/nice-select.css" type="text/css"/> */}
                    <link rel="stylesheet" href="/static/css/jquery-ui.min.css" type="text/css"/>
                    <link rel="stylesheet" href="/static/css/owl.carousel.min.css" type="text/css"/>
                    <link rel="stylesheet" href="/static/css/slicknav.min.css" type="text/css"/>
                    <link rel="stylesheet" href="/static/css/style.css" type="text/css"/>

                    <link
                    rel="stylesheet"
                    type="text/css"
                    charset="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                    />
                    <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                    />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                   <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/jquery-3.3.1.min.js").toString()}}></script>
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/bootstrap.min.js").toString()}}></script>
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/jquery-ui.min.js").toString()}}></script>
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/jquery.nice-select.min.js").toString()}}></script>
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/jquery.slicknav.js").toString()}}></script>
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/mixitup.min.js").toString()}}></script> 
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/owl.carousel.min.js").toString()}}></script> 
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/main.js").toString()}}></script> 
                    {/* <script type="text/javascript" dangerouslySetInnerHTML={{ __html: fs.readFileSync("./public/static/js/districts.min.js").toString()}}></script>  */}

                </body>

            </Html>
        )
    }
}

export default MyDocument