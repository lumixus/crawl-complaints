export const getComplaintSlug = (nodeElements) => {

    const elements = [];

    [...nodeElements].map(c => {
        console.log(c.querySelector('.solved-badge'));
        if(c.querySelector('.solved-badge') === null){
            const title = c.querySelector('.complaint-title')
            if(title !== null){
                const aElement = title.querySelector('a');
                if(aElement !== null){
                    const link = aElement.href;
                    elements.push(link);
                }
            }
        }
    });


    return elements;

}