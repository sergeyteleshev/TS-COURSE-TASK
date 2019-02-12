export const TEST_ACTION = "TEST_ACTION";
export const SETTINGS_HANDLE_CHANGE = "SETTINGS_HANDLE_CHANGE";

export function testAction () {
    return {
        type:TEST_ACTION,
    }
}

export function settingsHandleChange(propertyName, event)
{
    let settingsData = [];

    settingsData[propertyName] = event.target.value;
    if(settingsData[propertyName].length <= 2)
        return {
            type: SETTINGS_HANDLE_CHANGE,
            payload: settingsData,
        }
}