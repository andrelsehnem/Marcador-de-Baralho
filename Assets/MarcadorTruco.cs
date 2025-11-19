using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using static System.Net.Mime.MediaTypeNames;

public class MarcadorTruco : MonoBehaviour
{
    public TextMeshProUGUI pontosTimeA;
    public TextMeshProUGUI pontosTimeB;
    public TextMeshProUGUI WinnerA;
    public TextMeshProUGUI WinnerB;
    public ConfirmationDialog confirmationDialog;

    private int scoreA = 0;
    private int scoreB = 0;

    public void OperacaoA(bool somar, int valor)
    {
        if (scoreB >= 12) return;
        if (scoreA >= 12) return;

        if (scoreA < 12 && somar)
            scoreA += valor;
        else if (scoreA > 0 && !somar)
            scoreA -= valor;

        if(scoreA > 12)
            scoreA = 12;

        AtualizarPlacar();
    }

    public void OperacaoB(bool somar, int valor)
    {
        if (scoreA >= 12) return;
        if (scoreB >= 12) return;

        if (scoreB < 12 && somar)
            scoreB += valor;
        else if (scoreB > 0 && !somar)
            scoreB -= valor;

        if (scoreB > 12)
            scoreB = 12;

        AtualizarPlacar();
    }

    public void SomarA(int valor)
    {
        OperacaoA(true, valor);
    }

    public void SubtrairA(int valor)
    {
        OperacaoA(false, valor);
    }

    public void SomarB(int valor)
    {
        OperacaoB(true, valor);
    }

    public void SubtrairB(int valor)
    {
        OperacaoB(false, valor);
    }

    public void Resetar()
    {
        GameObject gameObject = GameObject.Find("ConfirmaReset");
        scoreA = 0;
        scoreB = 0;
        AtualizarPlacar();
    }

    public void AtualizarPlacar()
    {
        pontosTimeA.text = scoreA.ToString();
        pontosTimeB.text = scoreB.ToString();

        if(scoreA >= 12)
        {
            WinnerA.text = "VENCEDOR";
        }
        else
        {
            WinnerA.text = "";
        } 
        
        if(scoreB >= 12)
        {
            WinnerB.text = "VENCEDOR";
        }
        else
        {
            WinnerB.text = "";
        }
    }

    public void PedirConfirmacaoReset()
    {
        if (confirmationDialog == null)
        {
            // fallback: sem diálogo, apenas resetar
            Resetar();
            return;
        }

        confirmationDialog.Show("Tem certeza que deseja zerar o placar?", (bool confirmed) =>
        {
            if (confirmed)
            {
                Resetar();
            }
            else
            {
                // opcional: fazer algo quando cancelado
                Debug.Log("Reset cancelado pelo usuário.");
            }
        });
    }


}