import "./widgetLg.css";
import { useStateContext } from '../../contexts/ContextProvider';

export default function WidgetLg() {
  const { firstTimers } = useStateContext();

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">First Timers</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Name</th>
            <th className="widgetLgTh">Email</th>
            <th className="widgetLgTh">Phone</th>
          </tr>
          {firstTimers.map(ft => {
            return (
              <tr className="widgetLgTr">
                <td className="widgetLgDate">{ft.title}</td>
                <td className="widgetLgUser">
                  {/* <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="widgetLgImg"
                  /> */}
                  <span className="widgetLgName">{ft.firstName || ft.lastName? `${ft.firstName} ${ft.lastName}`: "Name not Provided"}</span>
                </td>
                <td className="widgetLgAmount">{ft.email}</td>
                {/* <td className="widgetLgStatus">
                  <Button type="Approved" />
                </td> */}
                <td className="widgetLgDate">{ft.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
