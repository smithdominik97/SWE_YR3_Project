import { InsertAsset } from "@/db/api"
import { Asset } from "@/app/asset"

export default function AssetForm() {

    const assetsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const asset: Asset = {
            systemname: formData.get('systemname') as string,
            model: formData.get('model') as string,
            manufacturer: formData.get('manufacturer') as string,
            type: formData.get('type') as string,
            ip: formData.get('ip') as string,
            purchasedate: formData.get('purchasedate') as string,
            note: formData.get('note') as string,
        };
        InsertAsset(asset);
    }

    return (
        <form method="POST" onSubmit={assetsubmit}>
            <input type="text" name="systemname"/>
            <input type="text" name="model"/>
            <input type="text" name="manufacturer"/>
            <input type="text" name="type"/>
            <input type="text" name="ip"/>
            <input type="text" name="purchasedate"/>
            <textarea name="note" id="" cols={30} rows={10}></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}

