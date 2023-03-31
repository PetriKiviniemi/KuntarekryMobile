import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
    information: {
        padding: 10,
        fontSize: 15,
    },
    textInput: {
        padding: 12,
        fontSize: 15,
        textDecorationLine: "underline"
    },
    inputAndIconContainer: {
        flexDirection: "row", 
        borderColor: "gray", 
        borderWidth: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    profileTabContainer: {
        flex: 1,
        width: '50%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileTabLeft: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#0094FF',
    },
    profileTabRight: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#8BBAAB',
    },
    profileTextField: {
        marginHorizontal: 20,
        paddingTop: 20,
        fontSize: 15,
    },
    dropdownsWrapper: {
        flexDirection: 'column',
    },
    dropdownsContainer: {
        flexDirection: 'column',
    },
    dropdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    profileDropdown: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    profileDropdownButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDropdownButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownIcon: {
        fontSize: 30,
        margin: 8,
    },
    profileDropdownModalContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    profileInputField: {
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxWidth: 150,
        maxHeight: 40,
        fontSize: 12,
        overflow: 'visible',
    },
    profileInputFieldLong: {
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 300,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    inputFieldsContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputFieldWrapper: {
        maxHeight: 80,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: 80,
    },
    centeredView: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',

        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    overlayPopupContainer: {
    },
    dropdownModalContainer: {
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    checkbox: {
        margin: 2,
    },
    saveButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AEE8D6',
        borderRadius: 5,
    },
    cancelButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3EB3CA',
        borderRadius: 5,
    },
    deleteButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dc143c',
        borderRadius: 5,
    },
    editButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AEE8D6',
        borderRadius: 5,
    },
    centeredButton: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});