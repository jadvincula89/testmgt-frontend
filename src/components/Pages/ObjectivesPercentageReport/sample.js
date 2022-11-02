
import React from 'react';
const uniqid = require('uniqid');
function ObjectivesPercentageReport(props) {
    return (
        <table>
            <tr>
                <td>
                <table>
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Area Percentage</th>
                            <th>Group</th>
                            <th>Group Percentage</th>
                            <th>Objectives</th>
                            <th>Objective Class</th>
                            <th>Scenario</th>
                            <th>Scenario Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td rowspan="20">(B)BILL</td></tr>
                        <tr><td rowspan="20">0</td></tr>
                        <tr>
                            <td rowspan="3">PAY</td>
                            <td rowspan="3">0</td>
                            
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                        </tr>


                        <tr>
                            <td rowspan="4">PAY BANK</td>
                            <td rowspan="4">0</td>
                        </tr>

                        <tr>
                            <td>9</td>
                            <td>10</td>
                            <td>11</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>13</td>
                            <td>14</td>
                            <td>15</td>
                            <td>16</td>
                        </tr>


                        <tr>
                            <td>17</td>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                        </tr>

                        <tr>
                            <td>PAY CNL</td>
                            <td>0</td>
                        </tr>
                        
                    </tbody>
                </table>
            </td>
            </tr>
        </table>
    )
}

export default ObjectivesPercentageReport;