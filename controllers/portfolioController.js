const Portfolio = require('../models/portfolio');

const getPortfolio = async (req, res) => {
    try {

        const portfolioItems = await Portfolio.find({artisanId: req.session.user._id}) // Assuming req.user is set after authentication
            .sort({ createdAt: -1 }); // Sort by newest first

        res.render('portfolio-page', {
            title: 'Portfolio - CraftConnect',
            currentPage: 'Portfolio',
            portfolioItems: portfolioItems
        });

    } catch (error) {
        console.error('Error Loading Portfolio:', error);
        res.status(500).send('Error Loading Portfolio')
    }
};

const getAddPortfolio = async (req, res) => {
    res.render('portfolio-add-new-project', {
        title: 'Add New Project - CraftConnect',
        currentPage: 'Portfolio-add-new-project'
    });
};




const postAddPortfolio = async (req, res) => {
    try {
        const { portfolioname, portfoliodescription, servicecategory } = req.body;
           
        if (!req.file) {
            return res.render('portfolio-add-new-project', { 
                error: 'Please select an image',
                title: 'Add New Project - CraftConnect',
                currentPage: 'Portfolio-add-new-project'
            });
        }

        const portfolioItem = new Portfolio({
            portfolioname: portfolioname,
            portfoliodescription: portfoliodescription,
            servicecategory: servicecategory,
            image: req.file.filename,
            artisanId: req.session.user._id // ← Fixed this line
        });

        await portfolioItem.save();
        res.redirect('/portfolio');

    } catch (error) {
        console.error('Error adding portfolio:', error);
        res.render('portfolio-add-new-project', {
            error: 'Error adding portfolio item. Please try again.',
            title: 'Add New Project - CraftConnect',
            currentPage: 'Portfolio-add-new-project'
        });
    }
};


const deletePortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.id;
        
        const deletedItem = await Portfolio.findOneAndDelete({
            _id: portfolioId,
            artisanId: req.session.user._id
        });

        if (!deletedItem) {
            console.log('Portfolio item not found');
        } else {
            console.log('Portfolio deleted:', deletedItem.portfolioname);
        }

        res.redirect('/portfolio');
        
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        res.redirect('/portfolio');
    }
};



module.exports = {
    getPortfolio,
    getAddPortfolio,
    postAddPortfolio,
    deletePortfolio
    
};