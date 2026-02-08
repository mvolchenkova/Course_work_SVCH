import '../AboutSite/AboutSite.css'
import i18n from '../../i18n';

export default function AboutSite(){
    const t = (key) => i18n.t(key);
    
    return(
        <>
            <div className="AboutSiteDiv">
                <div className="AboutSiteBlock">
                    <img src="/data/images/workoutGirl.png" alt="" className="runGirlImg"/>
                    <div>
                        <p className="blockName smalle">{t('about_workout_title')}</p>
                        <p className="blockText smalle">
                            {t('about_workout_text')}
                        </p>
                    </div>
                </div>
                <div className="AboutSiteBlock">
                    <div>
                        <p className="blockName smalle">{t('about_nutrition_title')}</p>
                        <p className="blockText smalle">
                            {t('about_nutrition_text')}
                        </p>
                    </div>
                    <img src="/data/images/cookingGirl.png" alt="" className="cookGirlImg"/>
                </div>
            </div>
        </>
    )
}