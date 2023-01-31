export interface IGenerator{
    handleGeneratePassword: ()=> void,
    password:  any;
    actionButtons: boolean;
    handlePasswordLength: ()=>void;
    passwordLength, updateCheckboxes, handleCopyToClipboard, setModalSave
}