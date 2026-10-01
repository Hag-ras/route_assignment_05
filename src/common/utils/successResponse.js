export const successResponse = ({res,status=200,msg='Done',data=undefined} = {})=>{
    return res.status(status).json({
        msg,
        status,
        data
    })
}