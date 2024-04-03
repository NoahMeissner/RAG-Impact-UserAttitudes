'use client'
import { useICStore } from "@/src/informationconsent";

export default function InformedConsentCheckbox() {

    const icStore = useICStore();
    const setIC = useICStore((state) => state.setIC);

    return (
        <div className="px-5 sm:justify-center sm:flex mb-2" >
            <input type="checkbox" name="InformedConsent" id="InformedConsentCheckBox" onChange={() => setIC(!icStore['accept_ic'])} />
            <label htmlFor="InformedConsentCheckBox" className="px-1">I accept the conditions</label>
        </div>
    );
}